import { httpHandler, ValidationException } from '@homeservenow/serverless-aws-handler'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ApiKeyDto } from '@/dto'
import { ApiKeyModel } from '@/models'
import { createApiKey as create } from '@/services'
import { authorised, decodeToken } from '@reapit/node-utils'

export const createApiKey = httpHandler<ApiKeyDto, ApiKeyModel>({
  serialise: {
    input: (event): ApiKeyDto => {
      authorised(event)
      const customer = decodeToken(event.headers['reapit-connect-token'] as string)
      const organisationId = customer['custom:reapit:orgId']
      const developerId = customer['custom:reapit:developerId']

      return event.body
        ? plainToClass(ApiKeyDto, {
            ...JSON.parse(event.body),
            organisationId,
            developerId,
          })
        : new ApiKeyDto()
    },
  },
  validator: async (dto: ApiKeyDto): Promise<ApiKeyDto> => {
    const errors = await validate(dto)

    if (errors.length >= 1) {
      throw new ValidationException(errors as any)
    }

    return dto
  },
  handler: async ({ body }): Promise<ApiKeyModel> => {
    return create(body)
  },
})
