import { PipelineModel } from '@/models'
import { httpHandler, BadRequestException } from '@homeservenow/serverless-aws-handler'
import { DeploymentStatus } from '@reapit/foundations-ts-definitions'
import * as service from './../services'

/**
 * Update a pipeline (cancel)
 */
// TODO refactor to delete method instead?
export const updatePipeline = httpHandler<{ status: DeploymentStatus.CANCELED }, PipelineModel>({
  validator: (payload) => {
    if (payload.status && payload.status !== DeploymentStatus.CANCELED) {
      throw new BadRequestException('Validation errors: Status can only be canceled')
    }

    return payload
  },
  handler: async ({ event, body }): Promise<PipelineModel> => {
    const pipeline = await service.findById(event.pathParameters?.id as string)

    if (pipeline.status !== DeploymentStatus.RUNNING) {
      return pipeline
    }

    return service.updatePipelineModel(pipeline, body)
  },
})
