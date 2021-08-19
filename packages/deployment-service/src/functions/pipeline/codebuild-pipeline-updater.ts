import { Context, Callback, SNSEvent, SNSHandler } from 'aws-lambda'
import { batchUpdateTask, findPipelineRunnerByCodeBuildId, savePipelineRunnerEntity } from '../../services'
import { CodeBuild } from 'aws-sdk'
import { TaskEntity } from '../../entities'

const acceptedPhases = ['BUILD', 'INSTALL', 'DOWNLOAD_SOURCE']
const acceptedEvents = ['CodeBuild Build State Change', 'CodeBuild Build Phase Change']

type BuildPhase = {
  ['phase-type']: CodeBuild.BuildPhaseType
  ['phase-status']?: CodeBuild.StatusType
  ['start-time']?: CodeBuild.Timestamp
  ['end-time']?: CodeBuild.Timestamp
  ['duration-in-seconds']: number
}

type BuildStatusEvent = {
  id: string
  detail: {
    ['build-id']: string
    ['additional-information']: {
      phases: BuildPhase[]
    }
  }
}

export const codebuildPipelineUpdater: SNSHandler = async (
  event: SNSEvent,
  context: Context,
  callback: Callback,
): Promise<void> => {
  await Promise.all(
    event.Records.map(async (record) => {
      const message: BuildStatusEvent = JSON.parse(record.Sns.Message)
      console.log('message', message)
      const buildId = message.detail['build-id'].split(':').pop()

      if (!buildId) {
        throw new Error('no buildId found')
      }

      if (!acceptedEvents.includes(message['detail-type'])) {
        throw new Error(`detail type [${message['detail-type']}] not supported`)
      }

      const phases = message.detail['additional-information'].phases.filter((phase) =>
        acceptedPhases.includes(phase['phase-type']),
      )

      const pipelineRunner = await findPipelineRunnerByCodeBuildId(buildId)

      if (!pipelineRunner) {
        throw new Error('pipelineRunner not found')
      }

      // update existing tasks
      pipelineRunner.tasks?.map((task) => {
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

        if (!pipelineRunner.tasks?.find((task) => task.functionName === phase['phase-type'])) {
          const newTask = new TaskEntity()

          newTask.functionName = phase['phase-type']
          newTask.startTime = phase['start-time']
          newTask.endTime = phase['end-time']
          newTask.elapsedTime = phase['duration-in-seconds']?.toString()

          pipelineRunner.tasks?.push(newTask)
        }
      })

      console.log('updated', pipelineRunner)

      const promises: Array<Promise<any>> = [savePipelineRunnerEntity(pipelineRunner)]

      if (pipelineRunner.tasks) {
        promises.push(batchUpdateTask(pipelineRunner.tasks))
      }

      await Promise.all(promises)
    }),
  )

  return callback(null, `Successfully processed ${event.Records.length} records.`)
}
