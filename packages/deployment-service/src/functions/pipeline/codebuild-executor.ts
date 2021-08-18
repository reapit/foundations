import { PipelineRunnerEntity } from '../../entities'
import { Context, Callback, SQSEvent, SQSHandler } from 'aws-lambda'
import { plainToClass } from 'class-transformer'
import { CodeBuild } from 'aws-sdk'
import yaml from 'yaml'
import { PackageManagerEnum } from '../../../../foundations-ts-definitions/deployment-schema'
import { QueueNames } from '../../constants'
import { sqs } from '../../services'

const codebuild = new CodeBuild({
  region: process.env.REGION,
})

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

      try {
        const start = codebuild.startBuild({
          projectName: 'test', // TODO change to env
          buildspecOverride: yaml.stringify({
            version: 0.2,
            phases: {
              pre_build: {
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
              files: `${pipeline.outDir}/*`,
            },
          }),
          sourceTypeOverride: 'GITHUB',
          sourceLocationOverride: pipeline.repository,
          artifactsOverride: {
            type: 'S3',
            location: process.env.DEPLOYMENT_VERSION_BUCKET_NAME,
            name: `${pipelineRunner.id}.zip`,
            path: `${pipeline.uniqueRepoName}/`,
          },
        })

        const result = await new Promise<any>((resolve, reject) => {
          start.send((error, data) => {
            if (error) {
              reject(error)
            }

            resolve(data)
          })
        })

        console.log('result', result)
      } catch (e) {
        console.error(e)
        console.log('codebuild config failure')
        throw e
      }

      await new Promise<void>((resolve, reject) =>
        sqs.deleteMessage(
          {
            ReceiptHandle: record.receiptHandle,
            QueueUrl: QueueNames.CODE_BUILD_EXECUTOR,
          },
          (err) => {
            if (err) {
              reject(err)
            }
            resolve()
          },
        ),
      )
    }),
  )

  return callback(null, `Successfully processed ${event.Records.length} records.`)
}
