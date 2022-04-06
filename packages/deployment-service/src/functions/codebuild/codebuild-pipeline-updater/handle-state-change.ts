import { QueueNames } from '../../../constants'
import { findPipelineRunnerByCodeBuildId, pusher, savePipelineRunnerEntity, sqs } from '../../../services'
import { BuildStateChangeEvent } from './types'

export const handleStateChange = async ({
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

  if (event.detail['additional-information']['build-complete']) {
    const promises: Promise<any>[] = []

    if (event.detail['build-status'] === 'FAILED') {
      pipelineRunner.buildStatus = 'FAILED'
      if (pipelineRunner.pipeline) pipelineRunner.pipeline.buildStatus = 'FAILED'

      promises.push(savePipelineRunnerEntity(pipelineRunner))
      promises.push(
        pusher.trigger(`private-${pipelineRunner.pipeline?.developerId}`, 'pipeline-runner-update', pipelineRunner),
      )
    }

    return Promise.all([
      ...promises,
      new Promise<void>((resolve, reject) =>
        sqs.sendMessage(
          {
            MessageBody: JSON.stringify(pipelineRunner),
            QueueUrl: QueueNames.CODEBUILD_VERSION_DEPLOY,
          },
          (error) => {
            if (error) {
              reject(error)
            }

            resolve()
          },
        ),
      ),
    ])
  }

  if (pipelineRunner.buildStatus === 'QUEUED') {
    pipelineRunner.buildStatus = 'IN_PROGRESS'

    if (pipelineRunner.pipeline) {
      pipelineRunner.pipeline.buildStatus = 'IN_PROGRESS'
    }

    return Promise.all([
      savePipelineRunnerEntity(pipelineRunner),
      pusher.trigger(`private-${pipelineRunner.pipeline?.developerId}`, 'pipeline-runner-update', pipelineRunner),
    ])
  }
}
