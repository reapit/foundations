import { PipelineModel } from '@/models'
import { ownership, resolveDeveloperId } from '@/utils'
import { httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import * as service from '../../services'
import { defaultOutputHeaders } from './../../constants'

/**
 * Create a new pipeline runner for deployment
 *
 * Cancels all existing running pipelines
 */
export const pipelineRunnerCreate = httpHandler<void, PipelineModel>({
  defaultOutputHeaders,
  handler: async ({ event }): Promise<PipelineModel> => {
    const pipelineId = event.pathParameters?.pipelineId

    if (!pipelineId) {
      throw new NotFoundException()
    }

    const developerId = await resolveDeveloperId(event)

    const deployment = await service.findPipelineById(pipelineId)

    if (!deployment) {
      throw new NotFoundException()
    }

    await ownership(deployment.developerId, developerId)

    return service.createPipelineRunnerModel({
      pipelineId,
    })
  },
})
