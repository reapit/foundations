import { PipelineModel } from '@/models'
import { authorised, ownership } from '@/utils'
import { httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import * as service from './../services'

/**
 * Create a new pipeline for deployment
 *
 * Cancels all existing running pipelines
 */
export const createPipeline = httpHandler<void, PipelineModel>({
  serialise: {
    input: (event) => {
      authorised(event)
    },
  },
  handler: async ({ event }): Promise<PipelineModel> => {
    const deploymentId = event.pathParameters?.deploymentId

    if (!deploymentId) {
      throw new NotFoundException()
    }

    const deployment = await service.getByKey(deploymentId)

    if (!deployment) {
      throw new NotFoundException()
    }

    await ownership(deployment.developerId, event.headers)

    return service.createPipelineModel({
      deploymentId,
    })
  },
})
