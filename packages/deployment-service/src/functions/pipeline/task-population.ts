import { PipelineModel, TaskModel } from '@/models'
import { createBatchTasks } from '@/services'
import {
  AppTypeEnum,
  PipelineModelInterface,
  PipelineRunnerModelInterface,
  TaskRunnerFunctions,
} from '@reapit/foundations-ts-definitions'
import { Handler, Context, Callback } from 'aws-lambda'
import { Converter } from 'aws-sdk/clients/dynamodb'
import { v4 as uuid } from 'uuid'

export const workflowCreation = async (
  pipeline: PipelineModel,
  pipelineRunner: PipelineRunnerModelInterface,
): Promise<TaskModel[]> => {
  const ids: string[] = [uuid(), uuid(), uuid()]

  const batchTasks: (Partial<TaskModel> & { pipelineId: string })[] =
    pipeline.appType !== AppTypeEnum.NODE
      ? [
          {
            id: ids[0],
            pipelineId: pipelineRunner.id as string,
            functionName: TaskRunnerFunctions.PULL,
            rightSibling: ids[0],
          },
          {
            id: ids[1],
            pipelineId: pipelineRunner.id as string,
            functionName: TaskRunnerFunctions.BUILD,
            leftSibling: ids[0],
            rightSibling: ids[2],
          },
          {
            id: ids[2],
            pipelineId: pipelineRunner.id as string,
            functionName: TaskRunnerFunctions.DEPLOY_LAMBDAS,
            leftSibling: ids[1],
          },
        ]
      : [
          {
            id: ids[0],
            pipelineId: pipelineRunner.id as string,
            functionName: TaskRunnerFunctions.PULL,
            rightSibling: ids[1],
          },
          {
            id: ids[1],
            pipelineId: pipelineRunner.id as string,
            functionName: TaskRunnerFunctions.BUILD,
            rightSibling: ids[2],
            leftSibling: ids[0],
          },
          {
            id: ids[2],
            pipelineId: pipelineRunner.id as string,
            functionName: TaskRunnerFunctions.DEPLOY_REACT,
            leftSibling: ids[1],
          },
        ]

  return createBatchTasks(batchTasks)
}

/**
 * DynamoDB stream to auto generate tasks on pipeline creation
 */
export const taskPopulation: Handler = async (event: any, context: Context, callback: Callback): Promise<void> => {
  // TODO stop all currently running pipelines for pipeline

  await Promise.all(
    event.Records.filter((record) => record.eventName === 'INSERT').map((record) => {
      const pipeline = Object.assign(new PipelineModel(), Converter.unmarshall(record.dynamodb.NewImage))

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
