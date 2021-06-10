import { PipelineModel } from '@/models'
import { ownership, resolveDeveloperId } from '@/utils'
import { httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import * as service from '../services'

/**
 * Create a new pipeline for deployment
 *
 * Cancels all existing running pipelines
 */
export const createPipeline = httpHandler<void, PipelineModel>({
  defaultOutputHeaders: {
    'Access-Control-Allow-Origin': '*',
  },
  handler: async ({ event }): Promise<PipelineModel> => {
    const deploymentId = event.pathParameters?.deploymentId

    if (!deploymentId) {
      throw new NotFoundException()
    }

    const developerId = await resolveDeveloperId(event)

    const deployment = await service.getByKey(deploymentId)

    if (!deployment) {
      throw new NotFoundException()
    }

    await ownership(deployment.developerId, developerId)

    return service.createPipelineModel({
      deploymentId,
    })
  },
})
