import { Context, Callback, SNSEvent, SNSHandler } from 'aws-lambda'
import { batchUpdateTask, findPipelineRunnerByCodeBuildId, savePipelineRunnerEntity } from '../../services'
import { CodeBuild } from 'aws-sdk'
import { PipelineRunnerEntity, TaskEntity } from '../../entities'

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
      console.log('event', event)
      const buildId = event.detail['build-id'].split(':').pop()

      if (!buildId) {
        throw new Error('no buildId found')
      }

      switch (event['detail-type']) {
        case EventEnum.PHASE_CHANGE:
          await handlePhaseChange({
            event,
            buildId,
          })
          break
        case EventEnum.STATE_CHANGE:
          await handleStateChange({
            event,
            buildId,
          })
          break
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

  const pipelineRunner = await findPipelineRunnerByCodeBuildId(buildId)

  if (!pipelineRunner) {
    throw new Error('pipelineRunner not found')
  }

  if (!event.detail['additional-information'].phases) {
    throw new Error('no phases')
  }

  const tasks = pipelineRunner.tasks || []

  // update existing tasks
  tasks.map((task) => {
    const phase = phases.find((phase) => phase['phase-type'] === task.functionName)

    console.log('phase', phase)

    if (!phase) {
      return task
    }

    return {
      ...task,
      status: phase?.['phase-status'],
      start: phase?.['start-time'],
      end: phase?.['end-time'],
      elapsedTime: phase?.['duration-in-seconds']?.toString(),
    }
  })

  // Create new tasks for new phases
  phases.forEach((phase) => {
    if (!pipelineRunner.tasks) {
      pipelineRunner.tasks = []
    }

    if (!tasks.find((task) => task.functionName === phase['phase-type'])) {
      const newTask = new TaskEntity()

      newTask.functionName = phase['phase-type']
      newTask.startTime = phase['start-time']
      newTask.endTime = phase['end-time']
      newTask.elapsedTime = phase['duration-in-seconds']?.toString()
      newTask.pipelineRunner = pipelineRunner

      tasks.push(newTask)
    }
  })

  console.log('updated', pipelineRunner)

  const promises: Array<Promise<any>> = [savePipelineRunnerEntity(pipelineRunner)]

  if (pipelineRunner.tasks) {
    promises.push(batchUpdateTask(pipelineRunner.tasks))
  }

  return Promise.all(promises)
}

const handleStateChange = async ({
  event,
  buildId,
}: {
  event: BuildStateChangeEvent
  buildId: string
}): Promise<PipelineRunnerEntity | never> => {
  const pipelineRunner = await findPipelineRunnerByCodeBuildId(buildId)

  if (!pipelineRunner) {
    throw new Error('pipelineRunner not found')
  }

  pipelineRunner.buildStatus = event.detail['build-status']

  return savePipelineRunnerEntity(pipelineRunner)
}
