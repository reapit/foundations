import { TaskEntity, PipelineRunnerEntity } from './../../entities'
import { createBatchTasks } from './../../services'
import { AppTypeEnum, TaskRunnerFunctions } from '@reapit/foundations-ts-definitions'
import { Handler, Context, Callback } from 'aws-lambda'
import { plainToClass } from 'class-transformer'

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

  const tasks = await Promise.all(
    event.Records.map((record) => {
      const pipelineRunner = plainToClass(PipelineRunnerEntity, JSON.parse(record.body))

      console.log('pipeline', pipelineRunner)

      // TODO find pipeline runners for all pipeline settings OR find pipeline on pipeline creation and sync settings?

      return workflowCreation(pipelineRunner)
    }),
  )

  console.log('tasks', tasks)

  // TODO start first task exec

  return callback(null, `Successfully processed ${event.Records.length} records.`)
}
