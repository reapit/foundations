import { PipelineModel } from '@/models'
import { authorised } from '@/utils'
import { httpHandler } from '@homeservenow/serverless-aws-handler'
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
    return service.findById(event.pathParameters?.id as string)
  },
})
