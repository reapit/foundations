import { PipelineModel } from '@/models'
import { httpHandler } from '@homeservenow/serverless-aws-handler'
import * as service from './../services'

export const getPipeline = httpHandler<void, PipelineModel>({
  handler: async ({ event }): Promise<PipelineModel> => {
    return service.findById(event.pathParameters?.id as string)
  },
})
