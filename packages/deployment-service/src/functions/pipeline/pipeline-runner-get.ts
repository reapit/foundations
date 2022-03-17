import { PipelineRunnerEntity } from '../../entities/pipeline-runner.entity'
import { ownership, resolveCreds } from './../../utils'
import { httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import * as service from '../../services'
import { defaultOutputHeaders } from './../../constants'
import { findByPipelineId } from '../../services'

/**
 * Get a pipeline by id
 */
export const pipelineRunnerGet = httpHandler<void, PipelineRunnerEntity>({
  defaultOutputHeaders,
  handler: async ({ event }): Promise<PipelineRunnerEntity> => {
    const { developerId } = await resolveCreds(event)

    const pipelineRunner = await service.findPipelineRunnerById(event.pathParameters?.pipelineId as string)

    if (!pipelineRunner || typeof pipelineRunner.pipeline === 'undefined') {
      throw new NotFoundException()
    }

    await ownership(pipelineRunner.pipeline.id as string, developerId)

    const tasks = await findByPipelineId(pipelineRunner.pipeline.id as string)
    pipelineRunner.tasks = tasks.filter((task) => task.pipelineRunner?.id === pipelineRunner.id)
    return pipelineRunner
  },
})
