import { httpHandler, NotFoundException, ValidationException } from '@homeservenow/serverless-aws-handler'
import { PipelineDto } from './../../dto'
import { PipelineEntity } from '../../entities/pipeline.entity'
import * as service from './../../services/pipeline'
import { validate } from 'class-validator'
import { ownership, resolveCreds } from './../../utils'
import { plainToClass } from 'class-transformer'
import { pusher, sqs } from '../../services'
import { defaultOutputHeaders, QueueNames } from '../../constants'

/**
 * Update a given pipeline
 */
export const pipelineUpdate = httpHandler<PipelineDto, PipelineEntity>({
  defaultOutputHeaders,
  validator: async (payload: any): Promise<PipelineDto> => {
    const dto = plainToClass(PipelineDto, payload)
    const errors = await validate(dto)

    if (errors.length >= 1) {
      throw new ValidationException(errors as any)
    }

    return dto
  },
  handler: async ({ body, event }): Promise<PipelineEntity> => {
    const { developerId } = await resolveCreds(event)
    let setupInfra = false

    const pipeline = await service.findPipelineById(event.pathParameters?.pipelineId as string)

    if (!pipeline) {
      throw new NotFoundException()
    }

    await ownership(pipeline.developerId, developerId)

    if (['PRE_PROVISIONED', 'FAILED_TO_PROVISION'].includes(pipeline.buildStatus as string) && body.buildStatus === 'PROVISION_REQUEST') {
      setupInfra = true
    }

    const updatedPipeline = await service.updatePipelineEntity(pipeline, body)

    await pusher.trigger(`private-${pipeline.developerId}`, 'pipeline-update', updatedPipeline)

    if (!setupInfra) {
      await new Promise<void>((resolve, reject) =>
        sqs.sendMessage(
          {
            MessageBody: JSON.stringify(updatedPipeline),
            QueueUrl: QueueNames.PIPELINE_SETUP,
          },
          (error) => {
            if (error) {
              reject(error)
            }
            resolve()
          },
        ),
      )
    }

    return updatedPipeline
  },
})
