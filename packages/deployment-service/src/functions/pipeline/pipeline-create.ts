import { httpHandler, ValidationException } from '@homeservenow/serverless-aws-handler'
import { PipelineDto } from '@/dto'
import { PipelineModel } from '@/models'
import * as service from '@/services/pipeline'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { resolveDeveloperId } from '../../utils'
import { defaultOutputHeaders } from '../../constants'

/**
 * Create a deployment pipeline configuration
 */
export const pipelineCreate = httpHandler<PipelineDto, PipelineModel>({
  defaultOutputHeaders,
  validator: async (dto: PipelineDto): Promise<PipelineDto> => {
    const errors = await validate(dto)

    if (errors.length >= 1) {
      throw new ValidationException(errors as any)
    }

    return dto
  },
  handler: async ({ event }): Promise<PipelineModel> => {
    const developerId = await resolveDeveloperId(event)

    const dto = event.body
      ? plainToClass(PipelineDto, {
          ...JSON.parse(event.body),
          developerId,
        })
      : new PipelineDto()

    return service.createPipelineModel(dto)
  },
})
