import { PipelineRunnerEntity } from '../../entities/pipeline-runner.entity'
import { ownership, resolveCreds } from './../../utils'
import { httpHandler, BadRequestException, NotFoundException } from '@homeservenow/serverless-aws-handler'
import * as service from '../../services'
import { defaultOutputHeaders } from './../../constants'

/**
 * Update a pipelineRunner (cancel)
 */
export const pipelineRunnerUpdate = httpHandler<{ buildStatus: string }, PipelineRunnerEntity>({
  defaultOutputHeaders,
  validator: (payload) => {
    if (payload.buildStatus && payload.buildStatus !== 'CANCEL') {
      throw new BadRequestException('Validation errors: Status can only be [CANCEL]')
    }

    return payload
  },
  handler: async ({ event, body }): Promise<PipelineRunnerEntity> => {
    const { developerId } = await resolveCreds(event)

    const pipelineRunner = await service.findPipelineRunnerById(event.pathParameters?.id as string)

    if (!pipelineRunner || typeof pipelineRunner.pipeline === 'undefined') {
      throw new NotFoundException()
    }

    await ownership(pipelineRunner.pipeline.id as string, developerId)

    if (pipelineRunner.buildStatus !== 'IN_PROGRESS') {
      return pipelineRunner
    }

    return service.updatePipelineRunnerEntity(pipelineRunner, body)
  },
})
