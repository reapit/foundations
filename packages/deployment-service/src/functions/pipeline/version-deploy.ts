import { SQSEvent, SQSHandler, Context, Callback } from 'aws-lambda'
import { QueueNames } from '../../constants'
import { PipelineEntity } from '../../entities'
import { deployFromStore } from '../../executables/deploy-from-store'
import { findPipelineRunnerById, savePipelineRunnerEntity, sqs } from '../../services'

export const versionDeploy: SQSHandler = async (event: SQSEvent, context: Context, callback: Callback) => {
  await Promise.all(
    event.Records.map(async (record) => {
      const payload = JSON.parse(record.body)

      console.log('payload', payload)

      const pipelineRunner = await findPipelineRunnerById(payload.id, {
        relations: ['pipeline'],
      })

      if (!pipelineRunner) {
        throw new Error(`pipelineRunner with id [${payload.id}] was not found`)
      }

      const deployTaskIndex = pipelineRunner.tasks?.findIndex((task) => task.functionName === 'DEPLOY')

      // TODO check status
      if (!deployTaskIndex) {
        throw new Error('No deploy task')
      }

      console.log('deploying')
      await deployFromStore({
        pipeline: pipelineRunner.pipeline as PipelineEntity,
      })

      pipelineRunner.buildStatus = 'SUCCEEDED'
      if (pipelineRunner.tasks) {
        pipelineRunner.tasks[deployTaskIndex].buildStatus = 'SUCCEEDED'
      }

      console.log('saving')

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
