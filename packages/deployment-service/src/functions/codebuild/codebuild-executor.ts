import { PipelineRunnerEntity } from '../../entities/pipeline-runner.entity'
import { TaskEntity } from '../../entities/task.entity'
import { Context, Callback, SQSEvent, SQSHandler } from 'aws-lambda'
import { plainToClass } from 'class-transformer'
import { CodeBuild } from 'aws-sdk'
import yaml from 'yaml'
import { PackageManagerEnum } from '../../../../foundations-ts-definitions/deployment-schema'
import { QueueNames } from '../../constants'
import {
  sqs,
  savePipelineRunnerEntity,
  githubApp,
  getBitBucketToken,
  pusher,
  assumedS3Client,
  createParameterStoreClient,
} from '../../services'
import { PipelineEntity } from '../../entities/pipeline.entity'
import fetch from 'node-fetch'
import { BitbucketClientData } from '@/entities/bitbucket-client.entity'
import { BitBucketEvent } from '..'
import { getRoleCredentials } from '../../services/sts'

const baseBitbucketUrl = 'https://bitbucket.org'

const obtainParameterStore = async (pipelineId: string) => {
  const parameterStoreClient = await createParameterStoreClient()

  return new Promise<Record<string, any>>((resolve, reject) =>
    parameterStoreClient.getParameter(
      {
        Name: `cloud-${pipelineId}`,
        WithDecryption: true,
      },
      (err, data) => {
        if (err && err.code !== 'ParameterNotFound') reject(err)
        resolve(data && data.Parameter && data.Parameter.Value ? JSON.parse(data.Parameter.Value) : {})
      },
    ),
  )
}

export const downloadBitbucketSourceToS3 = async ({
  pipeline,
  pipelineRunner,
  client,
  event,
}: {
  pipeline: PipelineEntity
  pipelineRunner: PipelineRunnerEntity
  client: BitbucketClientData
  event: BitBucketEvent
}): Promise<string> => {
  if (!pipeline.repository) {
    throw new Error('Pipeline repository is not configured')
  }
  const parts = pipeline.repository.split('/') as string[]
  const url = `${baseBitbucketUrl}/${parts[parts.length - 2]}/${parts[parts.length - 1]}/get/${pipeline.branch}.zip`

  if (!client) {
    throw new Error('Cannot pull from bitbucket without client data')
  }

  const tokenData = await getBitBucketToken({
    key: client.key,
    clientKey: client.clientKey,
  })

  const result = await fetch(url, {
    headers: {
      Authorization: event?.data.repository.is_private ? `Bearer ${tokenData.access_token}` : '',
    },
  })

  if (result.status !== 200) {
    throw new Error('failed to fetch zip from bitbucket')
  }

  const buffer = Buffer.from(await result.arrayBuffer())
  const usercodeS3client = await assumedS3Client()
  return new Promise<string>((resolve, reject) =>
    usercodeS3client.upload(
      {
        Bucket: process.env.DEPLOYMENT_REPO_CACHE_BUCKET_NAME as string,
        Key: `${pipelineRunner.id as string}.zip`,
        Body: buffer,
      },
      (err, data: any) => {
        if (err) return reject(err)
        resolve([process.env.DEPLOYMENT_REPO_CACHE_BUCKET_NAME as string, data.Key].join('/'))
      },
    ),
  )
}

export const downloadGithubSourceToS3 = async (
  pipeline: PipelineEntity,
  pipelineRunner: PipelineRunnerEntity,
): Promise<string> => {
  const installationId = pipeline.installationId
  const parts = pipeline.repository?.split('/') as string[]

  if (!installationId) {
    throw new Error('Pipeline repository is not configured or repository does not have reapit github app installed')
  }

  const response = await (
    await (await githubApp()).getInstallationOctokit(installationId)
  ).request('GET /repos/{owner}/{repo}/zipball/{ref}', {
    ref: '',
    owner: parts[parts.length - 2],
    repo: parts[parts.length - 1],
  })

  const usercodeS3client = await assumedS3Client()
  return new Promise<string>((resolve, reject) =>
    usercodeS3client.upload(
      {
        Bucket: process.env.DEPLOYMENT_REPO_CACHE_BUCKET_NAME as string,
        Key: `${pipelineRunner.id as string}.zip`,
        Body: Buffer.from(response.data as ArrayBuffer),
      },
      (err, data: any) => {
        if (err) return reject(err)
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
      const payload = JSON.parse(record.body)
      const pipelineRunner = plainToClass(PipelineRunnerEntity, payload.pipelineRunner)
      const pipeline = pipelineRunner.pipeline
      const event = payload.event

      if (!pipeline) {
        throw new Error('pipeline not found')
      }

      const codebuild = new CodeBuild({
        region: process.env.REGION,
        credentials: await getRoleCredentials(),
      })

      const s3BuildLogsLocation = `arn:aws:s3:::${process.env.DEPLOYMENT_LOG_BUCKET_NAME}`

      const params = await obtainParameterStore(pipeline.id as string)

      try {
        const repoLocation = pipeline.repository?.includes('github.com')
          ? await downloadGithubSourceToS3(pipeline, pipelineRunner)
          : await downloadBitbucketSourceToS3({
              pipeline,
              pipelineRunner,
              client: payload.client,
              event,
            })

        const start = codebuild.startBuild({
          projectName: process.env.CODE_BUILD_PROJECT_NAME as string,
          buildspecOverride: yaml.stringify({
            version: 0.2,
            env: {
              variables: params,
            },
            phases: {
              install: {
                'runtime-versions': {
                  nodejs: 12,
                },
                commands: [
                  'n install 14',
                  'n use 14',
                  'CACHE_FOLDER=$(find . -maxdepth 1 -mindepth 1 -type d)',
                  'echo $CACHE_FOLDER',
                  'mv $CACHE_FOLDER/* ./',
                  'rm -rf $CACHE_FOLDER',
                  pipeline.packageManager === PackageManagerEnum.YARN
                    ? pipeline.packageManager
                    : `${pipeline.packageManager} install`,
                ],
              },
              build: {
                commands: [
                  `${
                    pipeline.packageManager === PackageManagerEnum.NPM
                      ? `${pipeline.packageManager} run`
                      : pipeline.packageManager
                  } ${pipeline.buildCommand}`,
                ],
              },
            },
            artifacts: {
              files: '**/*',
              'base-directory': pipeline.outDir,
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

        const usercodeS3client = await assumedS3Client()
        const signedUrl = await usercodeS3client.getSignedUrlPromise('getObject', {
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
        pipeline.buildStatus = 'FAILED'
        pipelineRunner.pipeline = pipeline

        await Promise.all([
          deleteMessage(record.receiptHandle),
          savePipelineRunnerEntity(pipelineRunner),
          pusher.trigger(`private-${pipelineRunner.pipeline?.developerId}`, 'pipeline-runner-update', pipelineRunner),
        ])

        return Promise.reject(error)
      }

      return deleteMessage(record.receiptHandle)
    }),
  )

  return callback(null, `Successfully processed ${event.Records.length} records.`)
}
