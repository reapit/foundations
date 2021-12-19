import { getApiKey, removeApiKey as remove } from '../services'
import {
  httpHandler,
  HttpStatusCode,
  NotFoundException,
  UnauthorizedException,
} from '@homeservenow/serverless-aws-handler'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'
import { defaultOutputHeaders } from './../constants'

export const deleteApiKey = httpHandler({
  defaultOutputHeaders,
  defaultStatusCode: HttpStatusCode.NO_CONTENT,
  handler: async ({ event }): Promise<void> => {
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
