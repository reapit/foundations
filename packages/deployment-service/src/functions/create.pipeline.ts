import { PipelineModel } from '@/models'
import { authorised } from '@/utils'
import { httpHandler } from '@homeservenow/serverless-aws-handler'
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

    return service.createPipelineModel({
      deploymentId,
    })
  },
})
