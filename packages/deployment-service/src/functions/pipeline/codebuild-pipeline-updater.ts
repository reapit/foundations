import { Context, Callback, SNSEvent, SNSHandler } from 'aws-lambda'
import { findPipelineRunnerByCodeBuildId, savePipelineRunnerEntity, sqs, pusher } from '../../services'
import { CodeBuild } from 'aws-sdk'
import { QueueNames } from '../../constants'

const acceptedPhases = ['BUILD', 'INSTALL', 'DOWNLOAD_SOURCE']
enum EventEnum {
  STATE_CHANGE = 'CodeBuild Build State Change',
  PHASE_CHANGE = 'CodeBuild Build Phase Change',
}

type BuildPhase = {
  ['phase-type']: CodeBuild.BuildPhaseType
  ['phase-status']?: CodeBuild.StatusType
  ['start-time']?: CodeBuild.Timestamp
  ['end-time']?: CodeBuild.Timestamp
  ['duration-in-seconds']: number
}

type BuildPhaseChangeStatusEvent = {
  id: string
  ['detail-type']: EventEnum.PHASE_CHANGE
  detail: {
    ['build-id']: string
    ['additional-information']: {
      phases: BuildPhase[]
    }
  }
}

type BuildStateChangeEvent = {
  ['detail-type']: EventEnum.STATE_CHANGE
  detail: {
    'build-status': CodeBuild.StatusType
    'project-name': string
    'build-id': string
    'additional-information': {
      'build-complete': false
      initiator: string
      'build-start-time': string
      'queued-timeout-in-minutes': number
    }
    'current-phase': CodeBuild.StatusType
    'current-phase-context': string
    version: string
  }
}

export const codebuildPipelineUpdater: SNSHandler = async (
  event: SNSEvent,
  context: Context,
  callback: Callback,
): Promise<void> => {
  await Promise.all(
    event.Records.map(async (record) => {
      const event: BuildPhaseChangeStatusEvent | BuildStateChangeEvent = JSON.parse(record.Sns.Message)

      const buildId = event.detail['build-id']?.split(':')?.pop()

      switch (event['detail-type']) {
        case EventEnum.PHASE_CHANGE:
          if (!buildId) {
            throw new Error('no buildId found')
          }

          return handlePhaseChange({
            event,
            buildId,
          })
        case EventEnum.STATE_CHANGE:
          if (!buildId) {
            throw new Error('no buildId found')
          }

          return handleStateChange({
            event,
            buildId,
          })
        default:
          throw new Error(`Event type [${event['detail-type']}] not supported`)
      }
    }),
  )

  return callback(null, `Successfully processed ${event.Records.length} records.`)
}

const handlePhaseChange = async ({
  event,
  buildId,
}: {
  event: BuildPhaseChangeStatusEvent
  buildId: string
}): Promise<any | never> => {
  const phases = event.detail['additional-information'].phases.filter((phase) =>
    acceptedPhases.includes(phase['phase-type']),
  )

  let changesMade: boolean = false

  const pipelineRunner = await findPipelineRunnerByCodeBuildId(buildId)

  if (!pipelineRunner) {
    throw new Error('pipelineRunner not found')
  }

  if (!event.detail['additional-information'].phases) {
    throw new Error('no phases')
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
    task.startTime = phase['start-time'] ? new Date(phase['start-time']).toISOString() : undefined
    task.endTime = phase['end-time'] ? new Date(phase['end-time']).toISOString() : undefined
    task.elapsedTime = phase['duration-in-seconds']?.toString()

    return task
  })

  if (!changesMade) {
    return Promise.resolve()
  }

  return Promise.all([
    savePipelineRunnerEntity(pipelineRunner),
    pusher.trigger(pipelineRunner.pipeline?.developerId as string, 'pipeline-runner-update', pipelineRunner),
  ])
}

const handleStateChange = async ({
  event,
  buildId,
}: {
  event: BuildStateChangeEvent
  buildId: string
}): Promise<any | never> => {
  const pipelineRunner = await findPipelineRunnerByCodeBuildId(buildId)

  if (!pipelineRunner) {
    throw new Error('pipelineRunner not found')
  }

  // Double check this is fired AFTER codebuild has completed
  if (event.detail['additional-information']['build-complete']) {
    return new Promise<void>((resolve, reject) =>
      sqs.sendMessage(
        {
          MessageBody: JSON.stringify(pipelineRunner),
          QueueUrl: QueueNames.CODE_BUILD_VERSION_DEPLOY,
        },
        (error) => {
          if (error) {
            reject(error)
          }

          resolve()
        },
      ),
    )
  } else if (pipelineRunner.buildStatus === 'QUEUED') {
    pipelineRunner.buildStatus = 'IN_PROGRESS'

    if (pipelineRunner.pipeline) {
      pipelineRunner.pipeline.buildStatus = 'IN_PROGRESS'
    }

    return Promise.all([
      savePipelineRunnerEntity(pipelineRunner),
      pusher.trigger(pipelineRunner.pipeline?.developerId as string, 'pipeline-runner-update', pipelineRunner),
    ])
  }
}
