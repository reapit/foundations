import { SQSEvent, SQSHandler, Context, Callback } from 'aws-lambda'
import { QueueNames } from '../../constants'
import { PipelineEntity } from '../../entities'
import { deployFromStore } from '../../executables'
import {
  findPipelineRunnerById,
  pusher,
  savePipelineRunnerEntity,
  sqs,
  updateTask,
  resetCurrentlyDeployed,
} from '../../services'
import { logger } from '../../core'

const deleteMessage = (ReceiptHandle: string): Promise<void> =>
  new Promise((resolve, reject) =>
    sqs.deleteMessage(
      {
        ReceiptHandle,
        QueueUrl: QueueNames.CODEBUILD_VERSION_DEPLOY,
      },
      (error) => {
        error ? reject(error) : resolve()
      },
    ),
  )

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
          pusher.trigger(`private-${pipelineRunner.pipeline?.developerId}`, 'pipeline-runner-update', pipelineRunner),
        ])
      }

      if (deployTaskIndex === -1 || typeof deployTaskIndex === 'undefined' || !pipelineRunner.tasks) {
        throw new Error('No deployable task')
      }

      const deployTask = pipelineRunner.tasks[deployTaskIndex]
      deployTask.startTime = new Date()
      deployTask.buildStatus = 'IN_PROGRESS'

      pipelineRunner.tasks[deployTaskIndex] = deployTask

      await Promise.all([
        updateTask(deployTask, {
          startTime: new Date(),
          buildStatus: 'IN_PROGRESS',
        }),
        pusher.trigger(`${pipelineRunner.pipeline?.developerId}`, 'pipeline-runner-update', pipelineRunner),
      ])

      try {
        await deployFromStore({
          pipeline: pipelineRunner.pipeline as PipelineEntity,
          pipelineRunner,
        })

        pipelineRunner.buildStatus = 'SUCCEEDED'

        if (pipelineRunner.pipeline) {
          pipelineRunner.pipeline.buildStatus = 'SUCCEEDED'
        }
        if (pipelineRunner.tasks) {
          pipelineRunner.tasks[deployTaskIndex].buildStatus = 'SUCCEEDED'
          pipelineRunner.tasks[deployTaskIndex].endTime = new Date()
          pipelineRunner.tasks[deployTaskIndex].elapsedTime = Math.floor(
            (new Date().getTime() - (pipelineRunner.tasks[deployTaskIndex]?.startTime as Date).getTime()) / 1000,
          ).toString()
        }

        await resetCurrentlyDeployed(pipelineRunner.pipeline as PipelineEntity)
      } catch (error: any) {
        logger.error(error)

        pipelineRunner.buildStatus = 'FAILED'
        if (pipelineRunner.pipeline) {
          pipelineRunner.pipeline.buildStatus = 'FAILED'
        }
        if (pipelineRunner.tasks) {
          pipelineRunner.tasks[deployTaskIndex].buildStatus = 'FAILED'
          pipelineRunner.tasks[deployTaskIndex].endTime = new Date()
          pipelineRunner.tasks[deployTaskIndex].elapsedTime = Math.floor(
            (new Date().getTime() - (pipelineRunner.tasks[deployTaskIndex]?.startTime as Date).getTime()) / 1000,
          ).toString()
        }
        await deleteMessage(record.receiptHandle)
      }

      pipelineRunner.currentlyDeployed = true

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
