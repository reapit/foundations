import { PipelineRunnerEntity } from './../../entities'
import { ownership, resolveCreds } from './../../utils'
import { httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import * as service from '../../services'
import { defaultOutputHeaders } from './../../constants'
import { QueueNames } from './../../constants'

/**
 * Create a new pipeline runner for deployment
 *
 * Cancels all existing running pipelines
 */
export const pipelineRunnerCreate = httpHandler<void, PipelineRunnerEntity>({
  defaultOutputHeaders,
  handler: async ({ event }): Promise<PipelineRunnerEntity> => {
    const pipelineId = event.pathParameters?.pipelineId

    if (!pipelineId) {
      throw new NotFoundException()
    }

    const { developerId } = await resolveCreds(event)

    const pipeline = await service.findPipelineById(pipelineId)

    if (!pipeline) {
      throw new NotFoundException()
    }

    await ownership(pipeline.developerId, developerId)

    const pipelineRunner = await service.createPipelineRunnerEntity({
      pipeline,
    })

    await new Promise<void>((resolve, reject) =>
      service.sqs.sendMessage(
        {
          MessageBody: JSON.stringify(pipelineRunner),
          QueueUrl: QueueNames.TASK_POPULATION,
        },
        (error) => {
          if (error) {
            reject(error)
          }
          resolve()
        },
      ),
    )

    return pipelineRunner
  },
})
