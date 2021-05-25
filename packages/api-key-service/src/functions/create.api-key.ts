import { httpHandler, UnauthorizedException, ValidationException } from '@homeservenow/serverless-aws-handler'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ApiKeyDto } from '@/dto'
import { ApiKeyModel } from '@/models'
import { createApiKey as create } from '@/services'
import { authorised } from '@reapit/node-utils'
import { connectSessionVerifyDecodeIdToken, LoginIdentity } from '@reapit/connect-session'

export const createApiKey = httpHandler<ApiKeyDto, ApiKeyModel>({
  serialise: {
    input: async (event): Promise<ApiKeyDto> => {
      authorised(event)
      let customer: LoginIdentity | undefined

      try {
        customer = await connectSessionVerifyDecodeIdToken(
          event.headers['reapit-connect-token'] as string,
          process.env.CONNECT_USER_POOL as string,
        )
      } catch (e) {
        throw new UnauthorizedException(e.message)
      }

      return event.body
        ? plainToClass(ApiKeyDto, {
            ...JSON.parse(event.body),
            organisationId: customer?.orgId,
            developerId: customer?.developerId,
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
