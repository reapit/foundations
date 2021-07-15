import { httpHandler, NotFoundException, ValidationException } from '@homeservenow/serverless-aws-handler'
import { PipelineDto } from './../../dto'
import { PipelineEntity } from './../../entities'
import * as service from './../../services/pipeline'
import { validate } from 'class-validator'
import { ownership, resolveDeveloperId } from './../../utils'
import { defaultOutputHeaders } from './../../constants'
import { plainToClass } from 'class-transformer'

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
    const developerId = await resolveDeveloperId(event)

    // TODO should this be body.toApiKey
    const pipeline = await service.findPipelineById(event.pathParameters?.id as string)

    if (!pipeline) {
      throw new NotFoundException()
    }

    await ownership(pipeline.developerId, developerId)

    return service.updatePipelineEntity(pipeline, body)
  },
})
