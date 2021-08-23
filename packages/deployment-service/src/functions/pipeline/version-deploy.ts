import { SQSEvent, SQSHandler, Context, Callback } from 'aws-lambda'
import { QueueNames } from '../../constants'
import { PipelineEntity } from '../../entities'
import { deployFromStore } from '../../executables/deploy-from-store'
import { findPipelineRunnerById, savePipelineRunnerEntity, sqs } from '../../services'

export const versionDeploy: SQSHandler = async (event: SQSEvent, context: Context, callback: Callback) => {
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

      // TODO check status
      if (deployTaskIndex === -1 || typeof deployTaskIndex === 'undefined') {
        throw new Error('No deploy task')
      }

      try {
        await deployFromStore({
          pipeline: pipelineRunner.pipeline as PipelineEntity,
          pipelineRunner,
        })

        pipelineRunner.buildStatus = 'SUCCEEDED'
        if (pipelineRunner.tasks) {
          pipelineRunner.tasks[deployTaskIndex].buildStatus = 'SUCCEEDED'
        }
      } catch (e) {
        console.error(e)

        pipelineRunner.buildStatus = 'FAILED'
        if (pipelineRunner.tasks) {
          pipelineRunner.tasks[deployTaskIndex].buildStatus = 'FAILED'
        }
      }

      await savePipelineRunnerEntity(pipelineRunner)

      await new Promise<void>((resolve, reject) =>
        sqs.deleteMessage(
          {
            ReceiptHandle: record.receiptHandle,
            QueueUrl: QueueNames.CODE_BUILD_VERSION_DEPLOY,
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
