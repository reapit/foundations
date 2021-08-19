import { Context, Callback, SNSEvent, SNSHandler } from 'aws-lambda'
import { findPipelineRunnerByCodeBuildId } from '../../services'
import { CodeBuild } from 'aws-sdk'
import { TaskEntity } from 'src/entities'

const acceptedPhases = ['BUILD', 'INSTALL', 'DOWNLOAD_SOURCE']

type BuildPhase = {
  ['phase-type']: CodeBuild.BuildPhaseType
  ['phase-status']?: CodeBuild.StatusType
  ['start-time']?: CodeBuild.Timestamp
  ['end-time']?: CodeBuild.Timestamp
  ['duration-in-seconds']: number
}

type BuildStatusEvent = {
  id: string
  details: {
    phases: BuildPhase[]
  }
}

export const codebuildPipelineUpdater: SNSHandler = async (
  event: SNSEvent,
  context: Context,
  callback: Callback,
): Promise<void> => {
  await Promise.all(
    event.Records.map(async (record) => {
      console.log('record', record.Sns)

      const message: BuildStatusEvent = JSON.parse(record.Sns.Message)

      const phases = message.details.phases.filter((phase) => acceptedPhases.includes(phase['phase-type']))

      const pipelineRunner = await findPipelineRunnerByCodeBuildId(message.id)

      if (!pipelineRunner) {
        throw new Error('pipelineRunner not found')
      }

      console.log('pipelineRunner', pipelineRunner)

      // update existing tasks
      pipelineRunner.tasks?.map((task) => {
        const phase = phases.find((phase) => phase['phase-type'] === task.functionName)

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

        if (!pipelineRunner.tasks?.find((task) => task.functionName === phase['phase-type'])) {
          const newTask = new TaskEntity()

          newTask.functionName = phase['phase-type']
          newTask.startTime = phase['start-time']
          newTask.endTime = phase['end-time']
          newTask.elapsedTime = phase['duration-in-seconds']?.toString()

          pipelineRunner.tasks?.push(newTask)
        }
      })
    }),
  )

  return callback(null, `Successfully processed ${event.Records.length} records.`)
}
