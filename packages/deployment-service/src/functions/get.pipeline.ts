import { PipelineModel } from '@/models'
import { authorised, ownership } from '@/utils'
import { httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import * as service from './../services'

/**
 * Get a pipeline by id
 */
export const getPipeline = httpHandler<void, PipelineModel>({
  serialise: {
    input: (event) => {
      authorised(event)
    },
  },
  handler: async ({ event }): Promise<PipelineModel> => {
    const pipeline = await service.findById(event.pathParameters?.id as string)

    if (!pipeline || typeof pipeline.deployment === 'undefined') {
      throw new NotFoundException()
    }

    await ownership(pipeline.deployment.id as string, event.headers)

    return pipeline
  },
})
