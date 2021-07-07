import { httpHandler, ValidationException } from '@homeservenow/serverless-aws-handler'
import { PipelineDto } from './../../dto'
import { PipelineEntity } from './../../entities/pipeline.entity'
import * as service from './../../services/pipeline'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { resolveDeveloperId } from '../../utils'
import { defaultOutputHeaders } from '../../constants'

/**
 * Create a deployment pipeline configuration
 */
export const pipelineCreate = httpHandler<PipelineDto, PipelineEntity>({
  defaultOutputHeaders,
  validator: async (dto: PipelineDto): Promise<PipelineDto> => {
    const errors = await validate(dto)

    if (errors.length >= 1) {
      throw new ValidationException(errors as any)
    }

    return dto
  },
  handler: async ({ event }): Promise<PipelineEntity> => {
    const developerId = await resolveDeveloperId(event)

    const dto = event.body
      ? plainToClass(PipelineDto, {
          ...JSON.parse(event.body),
          developerId,
        })
      : new PipelineDto()

    return service.createPipelineEntity(dto)
  },
})
