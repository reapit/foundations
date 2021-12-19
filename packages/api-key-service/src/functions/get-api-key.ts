import { ApiKeyModel } from '@reapit/api-key-verify'
import { httpHandler, UnauthorizedException } from '@homeservenow/serverless-aws-handler'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'
import { getApiKey as get, getApiKeyByKey } from '../services'
import { defaultOutputHeaders } from './../constants'

export const getApiKey = httpHandler<void, ApiKeyModel>({
  defaultOutputHeaders,
  handler: async ({ event }) => {
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

    return get({
      id: event.pathParameters?.id,
      developerId: customer?.developerId,
    })
  },
})

export const getApiKeyViaInvoke = async ({
  apiKey: apiKeyHeader,
}: {
  apiKey?: string
}): Promise<ApiKeyModel | undefined> => {
  if (!apiKeyHeader) {
    return undefined
  }

  return getApiKeyByKey(apiKeyHeader)
}
