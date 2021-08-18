import { PipelineRunnerEntity, TaskEntity, TaskWorkflow } from './../../entities'
import { SQSHandler, Context, Callback, SQSEvent } from 'aws-lambda'
import { plainToClass } from 'class-transformer'
import * as services from './../../services'
import { DeploymentStatus, TaskRunnerFunctions } from '@reapit/foundations-ts-definitions'

const deleteMessage = (receiptHandle: string): Promise<void> => {
  console.log('receipt', receiptHandle)
  return Promise.resolve()
}

const failure = async (task: TaskEntity, receiptHandle, error?: Error): Promise<void> => {
  console.log(`Task [${task.functionName}] failed.`)
  console.error(error)

  await Promise.all([
    services.updatePipelineRunnerEntity(task.pipelineRunner as PipelineRunnerEntity, {
      buildStatus: DeploymentStatus.FAILED,
    }),
    services.updateTask(task, {
      status: DeploymentStatus.FAILED,
    }),
    deleteMessage(receiptHandle),
  ])
}

const overallSuccess = async (task: TaskEntity, receiptHandle: string): Promise<void> => {
  await Promise.all([
    services.updatePipelineRunnerEntity(task.pipelineRunner as PipelineRunnerEntity, {
      buildStatus: DeploymentStatus.SUCCESS,
    }),
    services.updateTask(task, {
      status: DeploymentStatus.SUCCESS,
    }),
    deleteMessage(receiptHandle),
  ])
}

const startTask = async (task: TaskEntity): Promise<void> => {
  console.log(`Starting task [${task.functionName}]`)

  await services.updateTask(task, {
    status: DeploymentStatus.RUNNING,
  })
}

const completeAndStartNext = async (task: TaskEntity, nextTask: TaskEntity, receiptHandle: string): Promise<void> => {
  console.log(`Task [${task.functionName}] completed. Starting [${nextTask.functionName}]`)

  await Promise.all([
    services.updateTask(task, {
      status: DeploymentStatus.SUCCESS,
    }),
    deleteMessage(receiptHandle),
  ])
}

const getNextTask = async (task: TaskEntity): Promise<TaskEntity | undefined> => {
  const workflow: TaskWorkflow = task.pipelineRunner?.pipeline?.workflow as TaskWorkflow
  const currentTaskIndex = workflow.indexOf(task.functionName as TaskRunnerFunctions)
  if (currentTaskIndex === -1) {
    return undefined
  }

  const nextTaskFunction = workflow[currentTaskIndex + 1]

  if (!nextTaskFunction) {
    return undefined
  }

  return services.findTaskByPipelineRunnerAndFunction(task.pipelineRunner as PipelineRunnerEntity, nextTaskFunction)
}

/**
 * SQS event for running tasks and determining pipeline results
 */
export const taskRunner: SQSHandler = async (event: SQSEvent, context: Context, callback: Callback): Promise<void> => {
  await Promise.all(
    event.Records.map(async (record) => {
      const receiptHandle = record.receiptHandle

      const cachedTask = plainToClass(TaskEntity, JSON.parse(record.body))

      const task = await services.findTaskById(cachedTask.id as string)

      if (!task || task.pipelineRunner?.buildStatus !== DeploymentStatus.RUNNING) {
        if (!task) {
          return
        }

        if (task?.pipelineRunner?.buildStatus === DeploymentStatus.PENDING) {
          await services.updatePipelineRunnerEntity(
            {
              ...task.pipelineRunner,
            },
            {
              buildStatus: DeploymentStatus.RUNNING,
            },
          )
        }
      }

      try {
        await startTask(task)

        const nextTask = await getNextTask(task)

        if (nextTask) {
          await completeAndStartNext(task, nextTask, receiptHandle)
        } else {
          overallSuccess(task, receiptHandle)
        }
      } catch (e) {
        console.log('catch, creating failure', e)
        await failure(task, receiptHandle, e)
      }
    }),
  )

  return callback(null, `Successfully processed ${event.Records.length} records.`)
}
