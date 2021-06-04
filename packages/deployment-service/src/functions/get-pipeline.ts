import { PipelineModel } from '@/models'
import { ownership } from '@/utils'
import { httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import * as service from '../services'
import { resolveDeveloperId } from '@/utils/resolve-developer-id'

/**
 * Get a pipeline by id
 */
export const getPipeline = httpHandler<void, PipelineModel>({
  handler: async ({ event }): Promise<PipelineModel> => {
    const developerId = await resolveDeveloperId(event)

    const pipeline = await service.findById(event.pathParameters?.id as string)

    if (!pipeline || typeof pipeline.deployment === 'undefined') {
      throw new NotFoundException()
    }

    await ownership(pipeline.deployment.id as string, developerId)

    return pipeline
  },
})
