import { PipelineModel } from '@/models'
import { httpHandler } from '@homeservenow/serverless-aws-handler'
import * as service from './../services'

/**
 * Create a new pipeline for deployment
 * 
 * Cancels all existing running pipelines
 */
export const createPipeline = httpHandler<void, PipelineModel>({
  handler: async ({ event }): Promise<PipelineModel> => {
    // TODO stop all currently running pipelines for deployment

    const deploymentId = event.pathParameters?.deploymentId

    return service.createPipelineModel({
      deploymentId,
    })
  },
})
