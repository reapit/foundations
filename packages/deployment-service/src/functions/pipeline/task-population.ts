import { TaskEntity, PipelineRunnerEntity, PipelineEntity } from './../../entities'
import { createBatchTasks } from './../../services'
import { Handler, Context, Callback } from 'aws-lambda'
import { plainToClass } from 'class-transformer'
import { sqs } from './../../services'
import { QueueNames } from '../../constants'

export const workflowCreation = async (pipelineRunner: PipelineRunnerEntity): Promise<TaskEntity[]> => {
  const batchTasks: Partial<TaskEntity>[] = (pipelineRunner.pipeline as PipelineEntity).workflow.map(
    (functionName) => ({
      functionName,
    }),
  )

  return createBatchTasks(pipelineRunner, batchTasks)
}

/**
 * SQS event to auto generate tasks on pipeline creation
 */
export const taskPopulation: Handler = async (event: any, context: Context, callback: Callback): Promise<void> => {
  // TODO stop all currently running pipelines for pipeline

  await Promise.all(
    event.Records.map(async (record) => {
      const pipelineRunner = plainToClass(PipelineRunnerEntity, JSON.parse(record.body))

      // TODO find pipeline runners for all pipeline settings OR find pipeline on pipeline creation and sync settings?

      const tasks = await workflowCreation(pipelineRunner)

      const firstTask = tasks[0]

      await Promise.all([
        new Promise<void>((resolve, reject) =>
          sqs.sendMessage(
            {
              MessageBody: JSON.stringify(firstTask),
              QueueUrl: QueueNames.TASK_RUNNER,
            },
            (error) => {
              if (error) {
                reject(error)
              }
              resolve()
            },
          ),
        ),
        new Promise<void>((resolve, reject) =>
          sqs.deleteMessage(
            {
              ReceiptHandle: record,
              QueueUrl: QueueNames.TASK_RUNNER,
            },
            (err) => {
              if (err) {
                reject(err)
              }
              resolve()
            },
          ),
        ),
      ])
    }),
  )

  // TODO delete from queue

  // TODO start first task exec
  return callback(null, `Successfully processed ${event.Records.length} records.`)
}
