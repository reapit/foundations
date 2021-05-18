import { PipelineModel } from '@/models'
import {httpHandler} from '@homeservenow/serverless-aws-handler'
import * as service from './../services'

export const createPipeline = httpHandler<void, PipelineModel>({
  handler: async ({event}): Promise<PipelineModel> => {
    const deploymentId = event.pathParameters?.deploymentId

    return service.createPipelineModel({
      deploymentId,
    })
  },
})
