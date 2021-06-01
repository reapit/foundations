import { getApiKey, removeApiKey as remove } from '../services'
import {
  httpHandler,
  HttpStatusCode,
  NotFoundException,
  UnauthorizedException,
} from '@homeservenow/serverless-aws-handler'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'
import publicKeys from '../../public-keys.json'

export const deleteApiKey = httpHandler({
  defaultStatusCode: HttpStatusCode.NO_CONTENT,
  handler: async ({ event }): Promise<void> => {
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

    const apiKey = await getApiKey({
      id: event.pathParameters?.id,
      developerId: customer.developerId,
    })

    if (!apiKey) {
      throw new NotFoundException()
    }

    await remove(apiKey)
  },
})
