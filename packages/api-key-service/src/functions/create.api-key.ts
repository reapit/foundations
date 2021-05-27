import { httpHandler, UnauthorizedException, ValidationException } from '@homeservenow/serverless-aws-handler'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ApiKeyDto } from '@/dto'
import { ApiKeyModel } from '@/models'
import { createApiKey as create } from '@/services'
import { connectSessionVerifyDecodeIdToken, LoginIdentity } from '@reapit/connect-session'

export const createApiKey = httpHandler<ApiKeyDto, ApiKeyModel>({
  handler: async ({ body, event }): Promise<ApiKeyModel> => {
    let customer: LoginIdentity | undefined

    try {
      customer = await connectSessionVerifyDecodeIdToken(
        event.headers?.Authorization as string,
        process.env.CONNECT_USER_POOL as string,
      )
    } catch (e) {
      throw new UnauthorizedException(e.message)
    }

    const dto = event.body
      ? plainToClass(ApiKeyDto, {
          ...body,
          organisationId: customer?.orgId,
          developerId: customer?.developerId,
        })
      : new ApiKeyDto()

    const errors = await validate(dto)

    if (errors.length >= 1) {
      throw new ValidationException(errors as any)
    }

    return create(dto)
  },
})
