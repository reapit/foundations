import { ApiKeyModel } from '@/models'
import { httpHandler, UnauthorizedException } from '@homeservenow/serverless-aws-handler'
import { connectSessionVerifyDecodeIdToken, LoginIdentity } from '@reapit/connect-session'
import { getApiKey as get } from './../services'

export const getApiKey = httpHandler<void, ApiKeyModel>({
  handler: async ({ event }) => {
    let customer: LoginIdentity | undefined

    try {
      customer = await connectSessionVerifyDecodeIdToken(
        event.headers?.Authorization as string,
        process.env.CONNECT_USER_POOL as string,
      )
    } catch (e) {
      throw new UnauthorizedException(e.message)
    }

    return get({
      id: event.pathParameters?.id,
      developerId: customer?.developerId ? customer.developerId : undefined,
      organisationId: customer?.orgId ? customer.orgId : undefined,
    })
  },
})
