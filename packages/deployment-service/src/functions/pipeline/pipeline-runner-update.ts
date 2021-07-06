import { PipelineEntity } from '@/entities'
import { ownership, resolveDeveloperId } from '@/utils'
import { httpHandler, BadRequestException, NotFoundException } from '@homeservenow/serverless-aws-handler'
import { DeploymentStatus } from '@reapit/foundations-ts-definitions'
import * as service from '../../services'
import { defaultOutputHeaders } from './../../constants'

/**
 * Update a pipelineRunner (cancel)
 */
// TODO refactor to delete method instead?
export const pipelineRunnerUpdate = httpHandler<{ buildStatus: DeploymentStatus.CANCELED }, PipelineEntity>({
  defaultOutputHeaders,
  validator: (payload) => {
    if (payload.buildSTatus && payload.buildSTatus !== DeploymentStatus.CANCELED) {
      throw new BadRequestException('Validation errors: Status can only be canceled')
    }

    return payload
  },
  handler: async ({ event, body }): Promise<PipelineEntity> => {
    const developerId = await resolveDeveloperId(event)

    const pipelineRunner = await service.findPipelineRunnerById(event.pathParameters?.id as string)

    if (!pipelineRunner || typeof pipelineRunner.pipeline === 'undefined') {
      throw new NotFoundException()
    }

    await ownership(pipelineRunner.pipeline.id as string, developerId)

    if (pipelineRunner.buildStatus !== DeploymentStatus.RUNNING) {
      return pipelineRunner
    }

    return service.updatePipelineRunnerEntity(pipelineRunner, body)
  },
})
