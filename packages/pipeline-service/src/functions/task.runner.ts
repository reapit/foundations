import { SQSHandler, SQSHandleActions } from '@homeservenow/serverless-aws-handler'
import { sqs } from '@/services'
import { DeploymentStatus } from '@reapit/foundations-ts-definitions'
import { PipelineModel, TaskModel } from '@/models'
import * as services from '@/services'

const updateTasks = async (tasks: TaskModel[]): Promise<void> => {
  await services.batchUpdateTask(tasks)
}

const pipelineStatusUpdate = async (pipeline: PipelineModel, buildStatus: DeploymentStatus): Promise<void> => {
  await services.updatePipelineModel(pipeline, {
    buildStatus,
  })
}

const nextTask = (pipeline: PipelineModel, rightSibling?: string): TaskModel | undefined => {
  return rightSibling ? pipeline.tasks?.find((task) => task.id === rightSibling) : undefined
}

type TaskExecutionType = {
  currentTask?: TaskModel
  pipeline: PipelineModel
}
/**
 * Task runner executable and pipeline
 */
export const taskRunner = SQSHandler<TaskExecutionType>(sqs)(
  async (execution: TaskExecutionType): Promise<SQSHandleActions> => {
    console.log('payload', execution)

    // TODO check pipeline is finished
    // TODO check if pipeline is canceled
    // TODO run execution with switch on task.functionName
    // TODO update task on result
    // TODO start next task || send complete

    const pipeline = await services.findById(execution.pipeline.id as string)
    execution.pipeline = pipeline

    // check pipeline is canceled to cancel task
    if (execution.pipeline.buildStatus === DeploymentStatus.CANCELED) {
      return Promise.resolve(SQSHandleActions.DELETE)
    }

    // Complete task
    if (!execution.currentTask) {
      await pipelineStatusUpdate(execution.pipeline, DeploymentStatus.SUCCESS)
      return Promise.resolve(SQSHandleActions.DELETE)
    }

    // Set pipeline and task as running
    execution.currentTask.status = DeploymentStatus.RUNNING
    await Promise.all([updateTasks([execution.currentTask]), pipelineStatusUpdate(pipeline, DeploymentStatus.RUNNING)])

    // this will be the result of running the executable task
    const executableResult = true

    // execution failure
    if (!executableResult) {
      execution.currentTask.status = DeploymentStatus.FAILED

      const tasksToUpdate = [execution.currentTask]

      const next = nextTask(pipeline, execution.currentTask.rightSibling)
      if (next) {
        next.status = DeploymentStatus.CANCELED
        tasksToUpdate.push(next)
      }

      await Promise.all([updateTasks(tasksToUpdate), pipelineStatusUpdate(execution.pipeline, DeploymentStatus.FAILED)])
      return Promise.resolve(SQSHandleActions.DELETE)
    }

    const next = nextTask(pipeline, execution.currentTask.rightSibling)
    execution.currentTask.status = DeploymentStatus.SUCCESS

    await updateTasks([execution.currentTask])

    const nextExecution: TaskExecutionType = {
      pipeline: execution.pipeline,
      currentTask: next,
    }

    await sqs.sendMessage({
      QueueUrl: '', // TODO create queue url
      MessageBody: JSON.stringify(nextExecution),
    })

    return Promise.resolve(SQSHandleActions.DELETE)
  },
)
