import { PipelineEntity } from '../entities/pipeline.entity'
import { PipelineRunnerHasNoDeployTask } from '../exceptions'
import { QueueNamesEnum } from '../constants'
import { PipelineRunnerEntity } from '../entities/pipeline-runner.entity'
import { AbstractWorkflow, SqsProvider, Workflow, PusherProvider } from '../events'
import { PipelineRunnerProvider, TaskProvider } from '../pipeline-runner'
import { DeployProvider } from '../deployment'

@Workflow(QueueNamesEnum.CODEBUILD_VERSION_DEPLOY)
export class CodebuildDeployWorkflow extends AbstractWorkflow<PipelineRunnerEntity> {
  constructor(
    private readonly pipelineRunnerProvider: PipelineRunnerProvider,
    sqsProvider: SqsProvider,
    private readonly pusherProvider: PusherProvider,
    private readonly taskProvider: TaskProvider,
    private readonly deployProvider: DeployProvider,
  ) {
    super(sqsProvider)
  }

  async execute(payload) {
    const pipelineRunner = await this.pipelineRunnerProvider.findById(payload.id, {
      relations: ['pipeline'],
    })

    if (!pipelineRunner) {
      throw new Error(`pipelineRunner with id [${payload.id}] was not found`)
    }

    const deployTaskIndex = pipelineRunner.tasks?.findIndex((task) => task.functionName === 'DEPLOY')
    if (pipelineRunner.buildStatus === 'CANCEL' || pipelineRunner.buildStatus === 'CANCELED') {
      pipelineRunner.buildStatus = 'CANCELED'

      await Promise.all([
        this.deleteMessage(),
        this.pipelineRunnerProvider.save(pipelineRunner),
        this.pusherProvider.trigger(
          `private-${pipelineRunner.pipeline?.developerId}`,
          'pipeline-runner-update',
          pipelineRunner,
        ),
      ])
      return
    }

    if (deployTaskIndex === -1 || typeof deployTaskIndex === 'undefined' || !pipelineRunner.tasks) {
      throw new PipelineRunnerHasNoDeployTask(pipelineRunner.id as string)
    }

    try {
      const deployTask = pipelineRunner.tasks[deployTaskIndex]
      deployTask.startTime = new Date()
      deployTask.buildStatus = 'IN_PROGRESS'

      pipelineRunner.tasks[deployTaskIndex] = deployTask

      await Promise.all([
        this.taskProvider.update(deployTask, {
          startTime: new Date(),
          buildStatus: 'IN_PROGRESS',
        }),
        this.pusherProvider.trigger(
          `${pipelineRunner.pipeline?.developerId}`,
          'pipeline-runner-update',
          pipelineRunner,
        ),
      ])

      await this.deployProvider.deployFromStore({
        pipeline: pipelineRunner.pipeline as PipelineEntity,
        pipelineRunner,
      })

      pipelineRunner.buildStatus = 'SUCCEEDED'
      ;(pipelineRunner.pipeline as PipelineEntity).buildStatus = 'SUCCEEDED'

      if (pipelineRunner.tasks) {
        pipelineRunner.tasks[deployTaskIndex].buildStatus = 'SUCCEEDED'
        pipelineRunner.tasks[deployTaskIndex].endTime = new Date()
        pipelineRunner.tasks[deployTaskIndex].elapsedTime = Math.floor(
          (new Date().getTime() - (pipelineRunner.tasks[deployTaskIndex]?.startTime as Date).getTime()) / 1000,
        ).toString()
      }

      await this.pipelineRunnerProvider.resetCurrentlyDeployed(pipelineRunner.pipeline as PipelineEntity)
      pipelineRunner.currentlyDeployed = true

      const updatedPipelineRunner = await this.pipelineRunnerProvider.save(pipelineRunner)
      await this.pusherProvider.trigger(
        `private-${pipelineRunner.pipeline?.developerId}`,
        'pipeline-runner-update',
        updatedPipelineRunner,
      )
    } catch (error: any) {
      console.error(error)

      pipelineRunner.buildStatus = 'FAILED'
      if (pipelineRunner.pipeline) {
        pipelineRunner.pipeline.buildStatus = 'FAILED'
      }
      if (pipelineRunner.tasks) {
        if (pipelineRunner.tasks[deployTaskIndex]?.startTime) {
          pipelineRunner.tasks[deployTaskIndex].elapsedTime = Math.floor(
            (new Date().getTime() - (pipelineRunner.tasks[deployTaskIndex].startTime as Date).getTime()) / 1000,
          ).toString()
        }
        pipelineRunner.tasks[deployTaskIndex].buildStatus = 'FAILED'
        pipelineRunner.tasks[deployTaskIndex].endTime = new Date()

        const updatedPipelineRunner = await this.pipelineRunnerProvider.save(pipelineRunner)
        await this.pusherProvider.trigger(
          `private-${pipelineRunner.pipeline?.developerId}`,
          'pipeline-runner-update',
          updatedPipelineRunner,
        )
      }
      await this.deleteMessage()
    }

    await this.deleteMessage()
  }
}
