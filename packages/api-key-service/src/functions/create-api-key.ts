import { httpHandler, UnauthorizedException, ValidationException } from '@homeservenow/serverless-aws-handler'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ApiKeyDto } from '@/dto'
import { ApiKeyModel } from '@reapit/api-key-verify'
import { createApiKey as create } from '@/services'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'
import { defaultOutputHeaders } from './../constants'

export const createApiKey = httpHandler<ApiKeyDto, ApiKeyModel>({
  defaultOutputHeaders,
  handler: async ({ body, event }): Promise<ApiKeyModel> => {
    let customer: LoginIdentity | undefined

    try {
      customer = await connectSessionVerifyDecodeIdTokenWithPublicKeys(
        event.headers?.Authorization as string,
        process.env.CONNECT_USER_POOL as string,
      )

      if (typeof customer === 'undefined' || !customer.developerId) {
        throw new Error('Unauthorised')
      }
    } catch (e: any) {
      const error = e as Error
      throw new UnauthorizedException(error.message)
    }

    const dto = event.body
      ? plainToClass(ApiKeyDto, {
          ...body,
          developerId: customer.developerId,
          clientCode: customer.clientId,
        })
      : new ApiKeyDto()

    const errors = await validate(dto)

    if (errors.length >= 1) {
      throw new ValidationException(errors as any)
    }

    return create(dto)
  },
})
