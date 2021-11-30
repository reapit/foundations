import { ApiKeyModel } from '@reapit/api-key-verify'
import { httpHandler, UnauthorizedException } from '@homeservenow/serverless-aws-handler'
import { batchGetApiKeys } from './../services'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'
import { defaultOutputHeaders } from './../constants'

type Pagintation<T> = {
  items: T[]
  meta: {
    // count: number
    nextCursor: string
  }
}

export const paginateApiKeys = httpHandler<void, Pagintation<ApiKeyModel>>({
  defaultOutputHeaders,
  handler: async ({ event }): Promise<Pagintation<ApiKeyModel>> => {
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

    const response = await batchGetApiKeys(
      customer as LoginIdentity & { developerId: string },
      event?.queryStringParameters?.nextCursor ? { id: event?.queryStringParameters?.nextCursor } : undefined,
    )

    const pagination: Pagintation<ApiKeyModel> = {
      items: [],
      meta: response[1],
    }

    for await (const apiKey of response[0]) {
      pagination.items.push(apiKey)
    }

    return pagination
  },
})
