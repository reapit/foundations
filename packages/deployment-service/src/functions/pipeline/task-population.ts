import { TaskEntity, PipelineRunnerEntity } from './../../entities'
import { createBatchTasks } from './../../services'
import { AppTypeEnum, TaskRunnerFunctions } from '@reapit/foundations-ts-definitions'
import { Handler, Context, Callback } from 'aws-lambda'
import { plainToClass } from 'class-transformer'
import { sqs } from './../../services'
import { QueueNames } from '../../constants'

export const workflowCreation = async (pipelineRunner: PipelineRunnerEntity): Promise<TaskEntity[]> => {
  const batchTasks: Partial<TaskEntity>[] =
    pipelineRunner.pipeline?.appType !== AppTypeEnum.NODE
      ? [
          {
            functionName: TaskRunnerFunctions.PULL,
          },
          {
            functionName: TaskRunnerFunctions.BUILD,
          },
          {
            functionName: TaskRunnerFunctions.DEPLOY_LAMBDAS,
          },
        ]
      : [
          {
            functionName: TaskRunnerFunctions.PULL,
          },
          {
            functionName: TaskRunnerFunctions.BUILD,
          },
          {
            functionName: TaskRunnerFunctions.DEPLOY_REACT,
          },
        ]

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

      const queueUrl = await new Promise<string>((resolve, reject) =>
        sqs.getQueueUrl(
          {
            QueueName: QueueNames.TASK_RUNNER,
          },
          (error, data) => {
            if (error) {
              console.error(error)
              reject()
            }
            typeof data.QueueUrl === 'undefined' ? reject() : resolve(data.QueueUrl)
          },
        ),
      )

      console.log('sending message on queue', queueUrl)
      await new Promise<void>((resolve, reject) =>
        sqs.sendMessage(
          {
            MessageBody: JSON.stringify(firstTask),
            QueueUrl: queueUrl,
          },
          (error) => {
            if (error) {
              reject(error)
            }
            resolve()
          },
        ),
      )
    }),
  )

  // TODO start first task exec
  return callback(null, `Successfully processed ${event.Records.length} records.`)
}
