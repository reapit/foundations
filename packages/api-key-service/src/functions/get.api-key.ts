import { ApiKeyModel } from '@/models'
import { httpHandler, UnauthorizedException } from '@homeservenow/serverless-aws-handler'
import { connectSessionVerifyDecodeIdToken, LoginIdentity } from '@reapit/connect-session'
import { authorised } from '@reapit/node-utils'
import { getApiKey as get } from './../services'

export const getApiKey = httpHandler<void, ApiKeyModel>({
  serialise: {
    input: async (event): Promise<void> => {
      authorised(event)
    },
  },
  handler: async ({ event }) => {
    let customer: LoginIdentity | undefined

    try {
      customer = await connectSessionVerifyDecodeIdToken(
        event.headers['reapit-connect-token'] as string,
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
