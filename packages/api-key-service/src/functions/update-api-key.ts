import {
  httpHandler,
  NotFoundException,
  UnauthorizedException,
  ValidationException,
} from '@homeservenow/serverless-aws-handler'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ApiKeyDto } from '@/dto'
import { ApiKeyModel } from '@reapit/api-key-verify'
import { getApiKey, updateApiKey as update } from '@/services'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'
import { defaultOutputHeaders } from './../constants'

export const updateApiKey = httpHandler<ApiKeyDto, ApiKeyModel>({
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

    const model = await getApiKey({
      id: event.pathParameters?.id,
      developerId: customer.developerId,
    })

    if (!model) {
      throw new NotFoundException()
    }

    const dto = event.body
      ? plainToClass(ApiKeyDto, {
          ...body,
          developerId: customer?.developerId,
        })
      : new ApiKeyDto()

    const errors = await validate(dto)

    if (errors.length >= 1) {
      throw new ValidationException(errors as any)
    }

    return update(model, dto)
  },
})
