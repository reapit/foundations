import { SQSEvent, SQSHandler, Context, Callback } from 'aws-lambda'
import { QueueNames } from '../../constants'
import { PipelineEntity } from '../../entities'
import { deployFromStore } from '../../executables'
import { findPipelineRunnerById, pusher, savePipelineRunnerEntity, sqs, updateTask } from '../../services'
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront'

const deleteMessage = (ReceiptHandle: string): Promise<void> => new Promise((resolve, reject) => sqs.deleteMessage({
  ReceiptHandle,
  QueueUrl: QueueNames.CODE_BUILD_VERSION_DEPLOY,
}, (error) => {
  error ? reject(error) : resolve()
}))

export const codebuildDeploy: SQSHandler = async (event: SQSEvent, context: Context, callback: Callback) => {
  await Promise.all(
    event.Records.map(async (record) => {
      const payload = JSON.parse(record.body)

      const pipelineRunner = await findPipelineRunnerById(payload.id, {
        relations: ['pipeline'],
      })

      if (!pipelineRunner) {
        throw new Error(`pipelineRunner with id [${payload.id}] was not found`)
      }

      const deployTaskIndex = pipelineRunner.tasks?.findIndex((task) => task.functionName === 'DEPLOY')

      if (pipelineRunner.buildStatus === 'CANCEL') {
        pipelineRunner.buildStatus = 'CANCELED'

        await Promise.all([
          deleteMessage(record.receiptHandle),
          savePipelineRunnerEntity(pipelineRunner),
          pusher.trigger(
            `private-${pipelineRunner.pipeline?.developerId}`,
            'pipeline-runner-update',
            pipelineRunner,
          ),
        ])
      }

      if (deployTaskIndex === -1 || typeof deployTaskIndex === 'undefined' || !pipelineRunner.tasks) {
        throw new Error('No deployable task')
      }

      const deployTask = pipelineRunner.tasks[deployTaskIndex]
      deployTask.startTime = new Date().toISOString()
      deployTask.buildStatus = 'IN_PROGRESS'

      pipelineRunner.tasks[deployTaskIndex] = deployTask

      await Promise.all([
        updateTask(deployTask, {
          startTime: new Date().toISOString(),
          buildStatus: 'IN_PROGRESS',
        }),
        pusher.trigger(`${pipelineRunner.pipeline?.developerId}`, 'pipeline-runner-update', pipelineRunner),
      ])

      try {
        await deployFromStore({
          pipeline: pipelineRunner.pipeline as PipelineEntity,
          pipelineRunner,
        })

        const cloudFrontClient = new CloudFrontClient({})
        const invalidateCommand = new CreateInvalidationCommand({
          DistributionId: pipelineRunner.pipeline?.cloudFrontId,
          InvalidationBatch: {
            Paths: {
              Items: ['/*'],
              Quantity: 1,
            },
            CallerReference: `deployment refresh for pipeline runner [${pipelineRunner.id}]`,
          },
        })

        await cloudFrontClient.send(invalidateCommand)

        pipelineRunner.buildStatus = 'SUCCEEDED'
        if (pipelineRunner.pipeline) {
          pipelineRunner.pipeline.buildStatus = 'SUCCEEDED'
        }
        if (pipelineRunner.tasks) {
          pipelineRunner.tasks[deployTaskIndex].buildStatus = 'SUCCEEDED'
          pipelineRunner.tasks[deployTaskIndex].endTime = new Date().toISOString()
          pipelineRunner.tasks[deployTaskIndex].elapsedTime = Math.floor(
            (new Date().getTime() - new Date(pipelineRunner.tasks[deployTaskIndex].startTime as string).getTime()) /
              1000,
          ).toString()
        }
      } catch (e) {
        console.error(e)

        pipelineRunner.buildStatus = 'FAILED'
        if (pipelineRunner.pipeline) {
          pipelineRunner.pipeline.buildStatus = 'FAILED'
        }
        if (pipelineRunner.tasks) {
          pipelineRunner.tasks[deployTaskIndex].buildStatus = 'FAILED'
          pipelineRunner.tasks[deployTaskIndex].endTime = new Date().toISOString()
          pipelineRunner.tasks[deployTaskIndex].elapsedTime = Math.floor(
            (new Date().getTime() - new Date(pipelineRunner.tasks[deployTaskIndex].startTime as string).getTime()) /
              1000,
          ).toString()
        }
      }

      const updatedPipelineRunner = await savePipelineRunnerEntity(pipelineRunner)
      await pusher.trigger(
        `private-${pipelineRunner.pipeline?.developerId}`,
        'pipeline-runner-update',
        updatedPipelineRunner,
      )

      await deleteMessage(record.receiptHandle)
    }),
  )

  return callback(null, `Successfully processed ${event.Records.length} records.`)
}
