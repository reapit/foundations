import { SQSHandler, SQSHandleActions } from '@homeservenow/serverless-aws-handler'
import { sqs } from '@/services'
import { DeploymentStatus } from '@reapit/foundations-ts-definitions'
import { PipelineRunnerEntity, TaskEntity } from '@/entities'
import * as services from '@/services'

const updateTasks = async (tasks: TaskEntity[]): Promise<void> => {
  await services.batchUpdateTask(tasks)
}

const pipelineStatusUpdate = async (pipeline: PipelineRunnerEntity, buildStatus: DeploymentStatus): Promise<void> => {
  await services.updatePipelineRunnerEntity(pipeline, {
    buildStatus,
  })
}

const nextTask = (pipeline: PipelineRunnerEntity, rightSibling?: string): TaskEntity | undefined => {
  return rightSibling ? pipeline.tasks?.find((task) => task.id === rightSibling) : undefined
}

type TaskExecutionContextType = {
  currentTask?: TaskEntity
  pipeline: PipelineRunnerEntity
}
/**
 * Task runner executable and pipeline
 */
export const taskRunner = SQSHandler<TaskExecutionContextType>(sqs)(
  async (executionContext: TaskExecutionContextType): Promise<SQSHandleActions> => {
    console.log('payload', executionContext)

    // TODO check pipeline is finished
    // TODO check if pipeline is canceled
    // TODO run execution with switch on task.functionName
    // TODO update task on result
    // TODO start next task || send complete

    const pipeline = await services.findPipelineRunnerById(executionContext.pipeline.id as string)
    executionContext.pipeline = pipeline

    // check pipeline is canceled to cancel task
    if (executionContext.pipeline.buildStatus === DeploymentStatus.CANCELED) {
      return Promise.resolve(SQSHandleActions.DELETE)
    }

    // Complete task
    if (!executionContext.currentTask) {
      await pipelineStatusUpdate(executionContext.pipeline, DeploymentStatus.SUCCESS)
      return Promise.resolve(SQSHandleActions.DELETE)
    }

    // Set pipeline and task as running
    executionContext.currentTask.status = DeploymentStatus.RUNNING
    await Promise.all([
      updateTasks([executionContext.currentTask]),
      pipelineStatusUpdate(pipeline, DeploymentStatus.RUNNING),
    ])

    // this will be the result of running the executable task
    // TODO add executable runner result and returns etc
    const executableResult = true

    // execution failure
    if (!executableResult) {
      executionContext.currentTask.status = DeploymentStatus.FAILED

      const tasksToUpdate = [executionContext.currentTask]

      const next = nextTask(pipeline, executionContext.currentTask.rightSibling)
      if (next) {
        next.status = DeploymentStatus.CANCELED
        tasksToUpdate.push(next)
      }

      await Promise.all([
        updateTasks(tasksToUpdate),
        pipelineStatusUpdate(executionContext.pipeline, DeploymentStatus.FAILED),
      ])
      return Promise.resolve(SQSHandleActions.DELETE)
    }

    const next = nextTask(pipeline, executionContext.currentTask.rightSibling)
    executionContext.currentTask.status = DeploymentStatus.SUCCESS

    await updateTasks([executionContext.currentTask])

    const nextExecution: TaskExecutionContextType = {
      pipeline: executionContext.pipeline,
      currentTask: next,
    }

    await sqs.sendMessage({
      QueueUrl: '', // TODO create queue url
      MessageBody: JSON.stringify(nextExecution),
    })

    return Promise.resolve(SQSHandleActions.DELETE)
  },
)
