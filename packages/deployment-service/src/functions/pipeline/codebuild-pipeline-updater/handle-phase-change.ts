import { findPipelineRunnerByCodeBuildId, pusher, savePipelineRunnerEntity } from '../../../services'
import { acceptedPhases, BuildPhaseChangeStatusEvent } from './types'

export const handlePhaseChange = async ({
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
    task.startTime = phase['start-time'] ? new Date(phase['start-time']) : undefined
    task.endTime = phase['end-time'] ? new Date(phase['end-time']) : undefined
    task.elapsedTime = phase['duration-in-seconds']?.toString()

    return task
  })

  if (!changesMade) {
    return Promise.resolve()
  }

  return Promise.all([
    savePipelineRunnerEntity(pipelineRunner),
    pusher.trigger(`private-${pipelineRunner.pipeline?.developerId}`, 'pipeline-runner-update', pipelineRunner),
  ])
}
