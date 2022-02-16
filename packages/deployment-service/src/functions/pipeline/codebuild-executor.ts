import { PipelineRunnerEntity } from '../../entities/pipeline-runner.entity'
import { TaskEntity } from '../../entities/task.entity'
import { Context, Callback, SQSEvent, SQSHandler } from 'aws-lambda'
import { plainToClass } from 'class-transformer'
import { CodeBuild } from 'aws-sdk'
import yaml from 'yaml'
import { PackageManagerEnum } from '../../../../foundations-ts-definitions/deployment-schema'
import { QueueNames } from '../../constants'
import { sqs, savePipelineRunnerEntity, s3Client, githubApp } from '../../services'
import { PipelineEntity } from '@/entities/pipeline.entity'

const codebuild = new CodeBuild({
  region: process.env.REGION,
})

const downloadSourceToS3 = async (pipeline: PipelineEntity, pipelineRunner: PipelineRunnerEntity): Promise<string> => {
  const installationId = pipeline.installationId
  const parts = pipeline.repository?.split('/') as string[]

  if (!installationId) {
    throw new Error('No installation Id. Please install github app')
  }

  const response = await (
    await githubApp.getInstallationOctokit(installationId)
  ).request('GET /repos/{owner}/{repo}/zipball/{ref}', {
    ref: '',
    owner: parts[parts.length - 2],
    repo: parts[parts.length - 1],
  })

  return new Promise<string>((resolve, reject) =>
    s3Client.upload(
      {
        Bucket: process.env.DEPLOYMENT_REPO_CACHE_BUCKET_NAME as string,
        Key: `${pipelineRunner.id as string}.zip`,
        Body: Buffer.from(response.data as ArrayBuffer),
      },
      (err, data: any) => {
        if (err) reject(err)
        resolve([process.env.DEPLOYMENT_REPO_CACHE_BUCKET_NAME as string, data.Key].join('/'))
      },
    ),
  )
}

const deleteMessage = (ReceiptHandle: string): Promise<void> =>
  new Promise((resolve, reject) =>
    sqs.deleteMessage(
      {
        ReceiptHandle,
        QueueUrl: QueueNames.CODEBUILD_EXECUTOR,
      },
      (error) => {
        error ? reject(error) : resolve()
      },
    ),
  )

/**
 * SQS event to start codebuild process with custom overrides
 */
export const codebuildExecutor: SQSHandler = async (
  event: SQSEvent,
  context: Context,
  callback: Callback,
): Promise<void> => {
  await Promise.all(
    event.Records.map(async (record) => {
      const pipelineRunner = plainToClass(PipelineRunnerEntity, JSON.parse(record.body))
      const pipeline = pipelineRunner.pipeline

      if (!pipeline) {
        throw new Error('pipeline not found')
      }

      if (!pipeline.installationId) {
        throw new Error('Pipeline repository is not configured or repository does not have reapit github app installed')
      }

      const s3BuildLogsLocation = `arn:aws:s3:::${process.env.DEPLOYMENT_LOG_BUCKET_NAME}`

      const repoLocation = await downloadSourceToS3(pipeline, pipelineRunner)

      console.log('location', repoLocation)

      try {
        const start = codebuild.startBuild({
          projectName: process.env.CODE_BUILD_PROJECT_NAME as string,
          buildspecOverride: yaml.stringify({
            version: 0.2,
            phases: {
              install: {
                commands: [
                  'cd */',
                  'ls -la',
                  pipeline.packageManager === PackageManagerEnum.YARN
                    ? pipeline.packageManager
                    : `${pipeline.packageManager} install`,
                ],
              },
              build: {
                commands: [`${pipeline.packageManager} ${pipeline.buildCommand}`],
              },
            },
            artifacts: {
              files: `${pipeline.outDir}/**/*`,
            },
          }),
          sourceTypeOverride: 'S3',
          sourceLocationOverride: repoLocation,
          artifactsOverride: {
            type: 'S3',
            packaging: 'ZIP',
            location: process.env.DEPLOYMENT_VERSION_BUCKET_NAME,
            name: `${pipelineRunner.id}.zip`,
            path: `pipeline/${pipeline.uniqueRepoName}/`,
          },
          logsConfigOverride: {
            s3Logs: {
              status: 'ENABLED',
              location: s3BuildLogsLocation,
            },
          },
        })

        const result = await new Promise<CodeBuild.StartBuildOutput>((resolve, reject) => {
          start.send((error, data) => {
            if (error) {
              reject(error)
            }

            resolve(data)
          })
        }).catch(async (error) => {
          console.error(error)
          await deleteMessage(record.receiptHandle)
          throw error
        })

        pipelineRunner.codebuildId = result.build?.id?.split(':').pop()

        const signedUrl = await s3Client.getSignedUrlPromise('getObject', {
          Key: `${pipelineRunner.codebuildId}.gz`,
          Bucket: process.env.DEPLOYMENT_LOG_BUCKET_NAME,
          Expires: 60 * 60 * 24 * 7,
        })

        pipelineRunner.s3BuildLogsLocation = signedUrl

        pipelineRunner.tasks = ['INSTALL', 'BUILD', 'DOWNLOAD_SOURCE', 'DEPLOY'].map((phase) => {
          const task = new TaskEntity()

          task.functionName = phase

          return task
        })

        await savePipelineRunnerEntity(pipelineRunner)
      } catch (error: any) {
        console.error(error)
        console.log('codebuild config failure')

        pipelineRunner.buildStatus = 'FAILED'

        await Promise.all([deleteMessage(record.receiptHandle), savePipelineRunnerEntity(pipelineRunner)])

        return Promise.reject(error)
      }

      return deleteMessage(record.receiptHandle)
    }),
  )

  return callback(null, `Successfully processed ${event.Records.length} records.`)
}
