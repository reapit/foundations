import { httpHandler, NotFoundException, ValidationException } from '@homeservenow/serverless-aws-handler'
import { PipelineDto } from './../../dto'
import { PipelineEntity } from '../../entities/pipeline.entity'
import * as service from './../../services/pipeline'
import { validate } from 'class-validator'
import { ownership, resolveCreds } from './../../utils'
import { plainToClass } from 'class-transformer'
import { sqs } from '../../services'
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

    if (pipeline.buildStatus === 'PAUSED' && body.buildStatus === 'CREATING_ARCHITECTURE') {
      setupInfra = true
    }

    await ownership(pipeline.developerId, developerId)

    if (!setupInfra) {
      await new Promise<void>((resolve, reject) =>
        sqs.sendMessage(
          {
            MessageBody: JSON.stringify(pipeline),
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

    return service.updatePipelineEntity(pipeline, body)
  },
})
