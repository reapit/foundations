import { PipelineRunnerModel } from '@/models'
import { ownership, resolveDeveloperId } from '@/utils'
import { httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import * as service from '../../services'
import { defaultOutputHeaders } from './../../constants'

/**
 * Get a pipeline by id
 */
export const pipelineRunnerGet = httpHandler<void, PipelineRunnerModel>({
  defaultOutputHeaders,
  handler: async ({ event }): Promise<PipelineRunnerModel> => {
    const developerId = await resolveDeveloperId(event)

    const pipelineRunner = await service.findPipelineRunnerById(event.pathParameters?.id as string)

    if (!pipelineRunner || typeof pipelineRunner.pipeline === 'undefined') {
      throw new NotFoundException()
    }

    await ownership(pipelineRunner.pipeline.id as string, developerId)

    return pipelineRunner
  },
})
