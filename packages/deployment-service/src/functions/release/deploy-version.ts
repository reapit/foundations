import { resolveCreds } from '../../utils'
import { httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import { defaultOutputHeaders } from '../../constants'
import * as services from './../../services/pipeline-runner'
import { PipelineEntity } from '../../entities/pipeline.entity'
import { deployFromStore } from './../../executables/deploy-from-store'
import { ownership } from '../../utils/ownership'
import { PipelineRunnerEntity } from '../../entities/pipeline-runner.entity'

/**
 * Release a particular version
 */
export const deployVersion = httpHandler<void, PipelineRunnerEntity>({
  defaultOutputHeaders,
  handler: async ({ event }) => {
    const { developerId } = await resolveCreds(event)
    const { pipelineRunnerId } = event.pathParameters as { pipelineRunnerId: string }

    const pipelineRunner = await services.findPipelineRunnerById(pipelineRunnerId, {
      relations: ['pipeline'],
    })

    if (!pipelineRunner) {
      throw new NotFoundException(`version [${pipelineRunnerId}] did not previously exist`)
    }

    ownership(developerId, (pipelineRunner.pipeline as PipelineEntity).developerId as string)

    await Promise.all([
      deployFromStore({
        pipeline: pipelineRunner.pipeline as PipelineEntity,
        pipelineRunner,
      }),
      services.resetCurrentlyDeployed(pipelineRunner.pipeline as PipelineEntity),
    ])

    pipelineRunner.currentlyDeployed = true

    return services.savePipelineRunnerEntity(pipelineRunner)
  },
})
