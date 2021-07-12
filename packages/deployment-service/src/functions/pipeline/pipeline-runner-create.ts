import { PipelineEntity } from './../../entities'
import { ownership, resolveDeveloperId } from './../../utils'
import { httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import * as service from '../../services'
import { defaultOutputHeaders } from './../../constants'
import { QueueNames } from './../../constants'

/**
 * Create a new pipeline runner for deployment
 *
 * Cancels all existing running pipelines
 */
export const pipelineRunnerCreate = httpHandler<void, PipelineEntity>({
  defaultOutputHeaders,
  handler: async ({ event }): Promise<PipelineEntity> => {
    const pipelineId = event.pathParameters?.pipelineId

    if (!pipelineId) {
      throw new NotFoundException()
    }

    const developerId = await resolveDeveloperId(event)

    const pipeline = await service.findPipelineById(pipelineId)

    if (!pipeline) {
      throw new NotFoundException()
    }

    await ownership(pipeline.developerId, developerId)

    const pipelineRunner = await service.createPipelineRunnerEntity({
      pipeline,
    })

    const queueUrl = await new Promise<string>((resolve, reject) =>
      service.sqs.getQueueUrl(
        {
          QueueName: QueueNames.TASK_POPULATION,
        },
        (error, data) => {
          if (error) {
            reject()
          }
          typeof data.QueueUrl === 'undefined' ? reject() : resolve(data.QueueUrl)
        },
      ),
    )

    await new Promise<void>((resolve, reject) =>
      service.sqs.sendMessage(
        {
          MessageBody: JSON.stringify(pipelineRunner),
          QueueUrl: queueUrl,
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
