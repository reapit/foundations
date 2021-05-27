import { ApiKeyModel } from '@/models'
import { httpHandler, UnauthorizedException } from '@homeservenow/serverless-aws-handler'
import { batchGetApiKeys } from './../services'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'
import publicKeys from './../../publicKeys.json'

type Pagintation<T> = {
  items: T[]
  meta: {
    count: number
    nextCursor: string
  }
}

export const paginateApiKeys = httpHandler<void, Pagintation<ApiKeyModel>>({
  handler: async ({ event }): Promise<Pagintation<ApiKeyModel>> => {
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

    const [items, meta] = await batchGetApiKeys(
      customer as LoginIdentity & { developerId: string },
      event?.queryStringParameters?.nextCursor ? { id: event?.queryStringParameters?.nextCursor } : undefined,
    )

    const pagination: Pagintation<ApiKeyModel> = {
      items: [],
      meta,
    }

    // TODO requires unmarshalling?
    for await (const apiKey of items) {
      pagination.items.push(apiKey)
    }

    return pagination
  },
})
