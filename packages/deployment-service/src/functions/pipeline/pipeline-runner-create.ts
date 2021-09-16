import { PipelineRunnerEntity } from './../../entities'
import { ownership, resolveCreds } from './../../utils'
import { BadRequestException, httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import * as service from '../../services'
import { defaultOutputHeaders } from './../../constants'
import { QueueNames } from './../../constants'

/**
 * Create a new pipeline runner for deployment
 *
 * Cancels all existing running pipelines
 */
export const pipelineRunnerCreate = httpHandler<void, PipelineRunnerEntity>({
  defaultOutputHeaders,
  handler: async ({ event }): Promise<PipelineRunnerEntity> => {
    const pipelineId = event.pathParameters?.pipelineId

    if (!pipelineId) {
      throw new NotFoundException()
    }

    const { developerId } = await resolveCreds(event)

    const pipeline = await service.findPipelineById(pipelineId)

    if (!pipeline) {
      throw new NotFoundException()
    }

    await ownership(pipeline.developerId, developerId)

    if (pipeline.buildStatus && ['IN_PROGRESS', 'DELETING', 'CREATING_ARCHITECTURE'].includes(pipeline.buildStatus)) {
      throw new BadRequestException('Cannot deploy in current state')
    }

    const pipelineRunner = await service.createPipelineRunnerEntity({
      pipeline,
    })

    if (!pipelineRunner) {
      throw new BadRequestException('Invalid pipeline runner payload')
    }

    await new Promise<void>((resolve, reject) =>
      service.sqs.sendMessage(
        {
          MessageBody: JSON.stringify(pipelineRunner),
          QueueUrl: QueueNames.CODE_BUILD_EXECUTOR,
        },
        (error) => {
          if (error) {
            reject(error)
          }
          resolve()
        },
      ),
    )

    return pipelineRunner
  },
})
