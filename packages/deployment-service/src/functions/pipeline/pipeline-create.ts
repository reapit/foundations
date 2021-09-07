import { httpHandler, ValidationException } from '@homeservenow/serverless-aws-handler'
import { PipelineDto } from './../../dto'
import { PipelineEntity } from './../../entities'
import * as service from './../../services/pipeline'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { resolveCreds } from '../../utils'
import { defaultOutputHeaders } from '../../constants'

/**
 * Create a deployment pipeline configuration
 */
export const pipelineCreate = httpHandler<PipelineDto, PipelineEntity>({
  defaultOutputHeaders,
  validator: async (payload: any): Promise<PipelineDto> => {
    const dto = plainToClass(PipelineDto, payload)

    const errors = await validate(dto)

    if (errors.length >= 1) {
      throw new ValidationException(errors as any)
    }

    return dto
  },
  handler: async ({ event }): Promise<PipelineEntity> => {
    const { developerId, clientCode } = await resolveCreds(event)

    const dto = event.body
      ? plainToClass(PipelineDto, {
          ...JSON.parse(event.body),
          developerId,
          clientId: clientCode,
        })
      : new PipelineDto()

    // TODO start cloudformation creation

    return service.createPipelineEntity(dto)
  },
})
