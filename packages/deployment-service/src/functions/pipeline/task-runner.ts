import { PipelineEntity, PipelineRunnerEntity, TaskEntity, TaskWorkflow } from './../../entities'
import { Handler, Context, Callback } from 'aws-lambda'
import { plainToClass } from 'class-transformer'
import * as services from './../../services'
import { DeploymentStatus, TaskRunnerFunctions } from '@reapit/foundations-ts-definitions'
import { resolveExecutable } from './../../executables'
import { QueueNames } from '../../constants'

const failure = async (task: TaskEntity, error?: Error): Promise<void> => {
  console.error(error)

  await Promise.all([
    services.updatePipelineRunnerEntity(task.pipelineRunner as PipelineRunnerEntity, {
      buildStatus: DeploymentStatus.FAILED,
    }),
    services.updateTask(task, {
      status: DeploymentStatus.FAILED,
    }),
  ])
}

const overallSuccess = async (task: TaskEntity): Promise<void> => {
  await Promise.all([
    services.updatePipelineRunnerEntity(task.pipelineRunner as PipelineRunnerEntity, {
      buildStatus: DeploymentStatus.SUCCESS,
    }),
    services.updateTask(task, {
      status: DeploymentStatus.SUCCESS,
    }),
  ])
}

const startTask = async (task: TaskEntity): Promise<void> => {
  await services.updateTask(task, {
    status: DeploymentStatus.RUNNING,
  })
}

const completeAndStartNext = async (task: TaskEntity, nextTask: TaskEntity): Promise<void> => {
  await Promise.all([
    new Promise<void>((resolve, reject) =>
      services.sqs.sendMessage(
        {
          MessageBody: JSON.stringify(nextTask),
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
    services.updateTask(task, {
      status: DeploymentStatus.SUCCESS,
    }),
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
export const taskRunner: Handler = async (event: any, context: Context, callback: Callback): Promise<void> => {
  await Promise.all(
    event.Records.map(async (record) => {
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
        const executable = resolveExecutable(task)

        await startTask(task)
        await executable(task, task.pipelineRunner?.pipeline as PipelineEntity)

        const nextTask = await getNextTask(task)

        if (nextTask) {
          await completeAndStartNext(task, nextTask)
        } else {
          overallSuccess(task)
        }
      } catch (e) {
        await failure(task, e)
      }
    }),
  )

  // TODO delete from queue

  return callback(null, `Successfully processed ${event.Records.length} records.`)
}
