import { PipelineEntity, TaskEntity } from '@/entities'
import { createBatchTasks } from '@/services'
import {
  AppTypeEnum,
  PipelineModelInterface,
  PipelineRunnerModelInterface,
  TaskRunnerFunctions,
} from '@reapit/foundations-ts-definitions'
import { Handler, Context, Callback } from 'aws-lambda'
import { Converter } from 'aws-sdk/clients/dynamodb'

export const workflowCreation = async (
  pipeline: PipelineEntity,
  pipelineRunner: PipelineRunnerModelInterface,
): Promise<TaskEntity[]> => {
  const batchTasks: Partial<TaskEntity>[] =
    pipeline.appType !== AppTypeEnum.NODE
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
 * DynamoDB stream to auto generate tasks on pipeline creation
 */
export const taskPopulation: Handler = async (event: any, context: Context, callback: Callback): Promise<void> => {
  // TODO stop all currently running pipelines for pipeline

  await Promise.all(
    event.Records.filter((record) => record.eventName === 'INSERT').map((record) => {
      const pipeline = Object.assign(new PipelineEntity(), Converter.unmarshall(record.dynamodb.NewImage))

      console.log(pipeline)

      // TODO find pipeline runners for all pipeline settings OR find pipeline on pipeline creation and sync settings?
      const pipelineRunner: PipelineModelInterface = {
        id: '',
        appType: AppTypeEnum.NODE,
      }

      return workflowCreation(pipeline, pipelineRunner)
    }),
  )

  // TODO start first task exec

  return callback(null, `Successfully processed ${event.Records.length} records.`)
}
