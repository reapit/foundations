import { PipelineModel } from '@/models'
import { ownership, resolveDeveloperId } from '@/utils'
import { httpHandler, BadRequestException, NotFoundException } from '@homeservenow/serverless-aws-handler'
import { DeploymentStatus } from '@reapit/foundations-ts-definitions'
import * as service from '../services'
import { defaultOutputHeaders } from './../constants'

/**
 * Update a pipeline (cancel)
 */
// TODO refactor to delete method instead?
export const updatePipeline = httpHandler<{ buildStatus: DeploymentStatus.CANCELED }, PipelineModel>({
  defaultOutputHeaders,
  validator: (payload) => {
    if (payload.buildSTatus && payload.buildSTatus !== DeploymentStatus.CANCELED) {
      throw new BadRequestException('Validation errors: Status can only be canceled')
    }

    return payload
  },
  handler: async ({ event, body }): Promise<PipelineModel> => {
    const developerId = await resolveDeveloperId(event)

    const pipeline = await service.findById(event.pathParameters?.id as string)

    if (!pipeline || typeof pipeline.deployment === 'undefined') {
      throw new NotFoundException()
    }

    await ownership(pipeline.deployment.id as string, developerId)

    if (pipeline.buildStatus !== DeploymentStatus.RUNNING) {
      return pipeline
    }

    return service.updatePipelineModel(pipeline, body)
  },
})
