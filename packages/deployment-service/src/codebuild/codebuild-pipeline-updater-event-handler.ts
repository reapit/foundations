import {
  acceptedPhases,
  BuildPhaseChangeStatusEvent,
  BuildStateChangeEvent,
  CodebuildEventStateEnum,
} from './event-types'
import { Injectable } from '@nestjs/common'
import { SNSEventRecord } from 'aws-lambda'
import { NoCodebuildPhasesException } from '../exceptions'
import { PipelineRunnerProvider } from '../pipeline-runner'
import { EventDispatcher, PusherProvider, SnsHandlerInterface } from '../events'

@Injectable()
export class CodebuildPipelineUpdaterEventHandler implements SnsHandlerInterface {
  constructor(
    private readonly pipelineRunnerProvider: PipelineRunnerProvider,
    private readonly pusherProvider: PusherProvider,
    private readonly eventDispatcher: EventDispatcher,
  ) {}

  async handle(record: SNSEventRecord) {
    const event: BuildPhaseChangeStatusEvent | BuildStateChangeEvent = JSON.parse(record.Sns.Message)

    const buildId = event.detail['build-id']?.split(':')?.pop()

    switch (event['detail-type']) {
      case CodebuildEventStateEnum.PHASE_CHANGE:
        if (!buildId) {
          throw new Error('no buildId found')
        }

        return this.handlePhaseChange({
          event,
          buildId,
        })
      case CodebuildEventStateEnum.STATE_CHANGE:
        if (!buildId) {
          throw new Error('no buildId found')
        }

        return this.handleStateChange({
          event,
          buildId,
        })
      default:
        throw new Error(`Event type [${event['detail-type']}] not supported`)
    }
  }

  async handlePhaseChange({
    event,
    buildId,
  }: {
    event: BuildPhaseChangeStatusEvent
    buildId: string
  }): Promise<any | never> {
    const phases = event.detail['additional-information'].phases?.filter((phase) =>
      acceptedPhases.includes(phase['phase-type']),
    )

    let changesMade: boolean = false

    const pipelineRunner = await this.pipelineRunnerProvider.findByCodebuildId(buildId)

    if (!pipelineRunner) {
      throw new Error('pipelineRunner not found')
    }

    if (!event.detail['additional-information'].phases || !phases) {
      throw new NoCodebuildPhasesException()
    }

    if (pipelineRunner.buildStatus === 'QUEUED') {
      changesMade = true
      pipelineRunner.buildStatus = 'IN_PROGRESS'

      if (pipelineRunner.pipeline) {
        pipelineRunner.pipeline.buildStatus = 'IN_PROGRESS'
      }
    }

    pipelineRunner.tasks = pipelineRunner.tasks?.map((task) => {
      const phase = phases.find((phase) => phase['phase-type'] === task.functionName)

      if (!phase) {
        return task
      }

      const buildStatus = phase['phase-status'] || 'IN_PROGRESS'

      if (buildStatus !== task.buildStatus) {
        changesMade = true
      }

      task.buildStatus = buildStatus
      task.startTime = phase['start-time'] ? new Date(phase['start-time']) : undefined
      task.endTime = phase['end-time'] ? new Date(phase['end-time']) : undefined
      task.elapsedTime = phase['duration-in-seconds']?.toString()

      return task
    })

    if (!changesMade) {
      return Promise.resolve()
    }

    return Promise.all([
      this.pipelineRunnerProvider.save(pipelineRunner),
      this.pusherProvider.trigger(
        `private-${pipelineRunner.pipeline?.developerId}`,
        'pipeline-runner-update',
        pipelineRunner,
      ),
    ])
  }

  async handleStateChange({ event, buildId }: { event: BuildStateChangeEvent; buildId: string }): Promise<any | never> {
    const pipelineRunner = await this.pipelineRunnerProvider.findByCodebuildId(buildId)

    if (!pipelineRunner) {
      throw new Error('pipelineRunner not found')
    }

    if (event.detail['additional-information']['build-complete']) {
      const promises: Promise<any>[] = []

      if (event.detail['build-status'] === 'FAILED') {
        pipelineRunner.buildStatus = 'FAILED'
        if (pipelineRunner.pipeline) pipelineRunner.pipeline.buildStatus = 'FAILED'

        promises.push(this.pipelineRunnerProvider.save(pipelineRunner))
        promises.push(
          this.pusherProvider.trigger(
            `private-${pipelineRunner.pipeline?.developerId}`,
            'pipeline-runner-update',
            pipelineRunner,
          ),
        )
      }

      return Promise.all([...promises, this.eventDispatcher.triggerCodebuildVersionDeploy(pipelineRunner)])
    }

    if (pipelineRunner.buildStatus === 'QUEUED') {
      pipelineRunner.buildStatus = 'IN_PROGRESS'

      if (pipelineRunner.pipeline) {
        pipelineRunner.pipeline.buildStatus = 'IN_PROGRESS'
      }

      return Promise.all([
        this.pipelineRunnerProvider.save(pipelineRunner),
        this.pusherProvider.trigger(
          `private-${pipelineRunner.pipeline?.developerId}`,
          'pipeline-runner-update',
          pipelineRunner,
        ),
      ])
    }
  }
}
