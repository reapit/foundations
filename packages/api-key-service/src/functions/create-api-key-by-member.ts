import { httpHandler, UnauthorizedException, ValidationException } from '@homeservenow/serverless-aws-handler'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ApiKeyMemberDto } from '@/dto'
import { ApiKeyModel } from '@reapit/api-key-verify'
import { createApiKey as create } from '@/services'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'
import { defaultOutputHeaders } from '../constants'

export const createApiKeyByMember = httpHandler<ApiKeyMemberDto, ApiKeyModel>({
  defaultOutputHeaders,
  validator: async (body) => {
    const dto = body
      ? plainToClass(ApiKeyMemberDto, body)
      : new ApiKeyMemberDto()

    const errors = await validate(dto)

    if (errors.length >= 1) {
      throw new ValidationException(errors as any)
    }

    return dto
  },
  handler: async ({ body, event }): Promise<ApiKeyModel> => {
    let admin: LoginIdentity | undefined

    try {
      admin = await connectSessionVerifyDecodeIdTokenWithPublicKeys(
        event.headers?.Authorization as string,
        process.env.CONNECT_USER_POOL as string,
      )

      if (typeof admin === 'undefined' || !admin.developerId) {
        throw new Error('Unauthorised')
      }
    } catch (e: any) {
      const error = e as Error
      throw new UnauthorizedException(error.message)
    }

    return create(body)
  },
})
