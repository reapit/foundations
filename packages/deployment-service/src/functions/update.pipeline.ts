import { PipelineModel } from '@/models'
import { authorised } from '@/utils'
import { httpHandler, BadRequestException } from '@homeservenow/serverless-aws-handler'
import { DeploymentStatus } from '@reapit/foundations-ts-definitions'
import * as service from './../services'

/**
 * Update a pipeline (cancel)
 */
// TODO refactor to delete method instead?
export const updatePipeline = httpHandler<{ buildStatus: DeploymentStatus.CANCELED }, PipelineModel>({
  serialise: {
    input: (event) => {
      authorised(event)
    },
  },
  validator: (payload) => {
    if (payload.buildSTatus && payload.buildSTatus !== DeploymentStatus.CANCELED) {
      throw new BadRequestException('Validation errors: Status can only be canceled')
    }

    return payload
  },
  handler: async ({ event, body }): Promise<PipelineModel> => {
    const pipeline = await service.findById(event.pathParameters?.id as string)

    if (pipeline.buildStatus !== DeploymentStatus.RUNNING) {
      return pipeline
    }

    return service.updatePipelineModel(pipeline, body)
  },
})
