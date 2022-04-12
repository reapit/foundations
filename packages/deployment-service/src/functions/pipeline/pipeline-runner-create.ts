import { PipelineRunnerEntity } from '../../entities/pipeline-runner.entity'
import { ownership, resolveCreds } from './../../utils'
import {
  BadRequestException,
  HttpErrorException,
  httpHandler,
  HttpStatusCode,
  NotFoundException,
} from '@homeservenow/serverless-aws-handler'
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

    ownership(pipeline.developerId, developerId)

    if (
      pipeline.isPipelineDeploymentDisabled ||
      (await service.pipelineRunnerCountRunning(pipeline)) >= 1 ||
      pipeline.buildStatus === 'PRE_PROVISIONED'
    ) {
      throw new HttpErrorException('Cannot create deployment in current state', 409 as HttpStatusCode)
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
          MessageBody: JSON.stringify({ pipelineRunner }),
          QueueUrl: QueueNames.CODEBUILD_EXECUTOR,
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
