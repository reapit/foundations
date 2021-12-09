import { PipelineRunnerEntity, TaskEntity } from '../../entities'
import { Context, Callback, SQSEvent, SQSHandler } from 'aws-lambda'
import { plainToClass } from 'class-transformer'
import { CodeBuild } from 'aws-sdk'
import yaml from 'yaml'
import { PackageManagerEnum } from '../../../../foundations-ts-definitions/deployment-schema'
import { QueueNames } from '../../constants'
import { sqs, savePipelineRunnerEntity, s3Client } from '../../services'

const codebuild = new CodeBuild({
  region: process.env.REGION,
})

const deleteMessage = (ReceiptHandle: string): Promise<void> =>
  new Promise((resolve, reject) =>
    sqs.deleteMessage(
      {
        ReceiptHandle,
        QueueUrl: QueueNames.CODE_BUILD_EXECUTOR,
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

      const s3BuildLogsLocation = `arn:aws:s3:::${process.env.DEPLOYMENT_LOG_BUCKET_NAME}`

      try {
        const start = codebuild.startBuild({
          projectName: process.env.CODE_BUILD_PROJECT_NAME as string,
          buildspecOverride: yaml.stringify({
            version: 0.2,
            phases: {
              install: {
                commands: [
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
          sourceTypeOverride: 'GITHUB',
          sourceLocationOverride: pipeline.repository,
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
        await deleteMessage(record.receiptHandle)
        return Promise.reject(error)
      }

      return deleteMessage(record.receiptHandle)
    }),
  )

  return callback(null, `Successfully processed ${event.Records.length} records.`)
}
