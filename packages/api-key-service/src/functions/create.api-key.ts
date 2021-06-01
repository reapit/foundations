import { httpHandler, UnauthorizedException, ValidationException } from '@homeservenow/serverless-aws-handler'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ApiKeyDto } from '@/dto'
import { ApiKeyModel } from '@/models'
import { createApiKey as create } from '@/services'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'
import publicKeys from './../../publicKeys.json'

export const createApiKey = httpHandler<ApiKeyDto, ApiKeyModel>({
  handler: async ({ body, event }): Promise<ApiKeyModel> => {
    let customer: LoginIdentity | undefined

    try {
      customer = await connectSessionVerifyDecodeIdTokenWithPublicKeys(
        event.headers?.Authorization as string,
        process.env.CONNECT_USER_POOL as string,
        publicKeys,
      )

      if (typeof customer === 'undefined' || !customer.developerId) {
        throw new Error('Unauthorised')
      }
    } catch (e) {
      throw new UnauthorizedException(e.message)
    }

    const dto = event.body
      ? plainToClass(ApiKeyDto, {
          ...body,
          developerId: customer.developerId,
        })
      : new ApiKeyDto()

    const errors = await validate(dto, {
      whitelist: true,
    })

    if (errors.length >= 1) {
      throw new ValidationException(errors as any)
    }

    return create(dto)
  },
})
