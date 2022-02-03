import { ApiKeyModel } from '@reapit/api-key-verify'
import { httpHandler, NotFoundException, UnauthorizedException } from '@homeservenow/serverless-aws-handler'
import { batchGetApiKeys, resolveCustomer } from '../services'
import { defaultOutputHeaders } from '../constants'
import { LoginIdentity } from '@reapit/connect-session'

type Pagintation<T> = {
  items: T[]
  meta: {
    // count: number
    nextCursor: string
  }
}

export const paginateMemberApiKeys = httpHandler<void, Pagintation<ApiKeyModel>>({
  defaultOutputHeaders,
  handler: async ({ event }): Promise<Pagintation<ApiKeyModel>> => {
    let customer: LoginIdentity | undefined

    try {
      customer = await resolveCustomer(event)

      if (typeof customer === 'undefined' || !customer.developerId) {
        throw new Error('Unauthorised')
      }
    } catch (e: any) {
      const error = e as Error
      throw new UnauthorizedException(error.message)
    }

    const email = event?.pathParameters?.email

    if (!email) {
      throw new NotFoundException()
    }

    const response = await batchGetApiKeys(
      {
        email: email as string,
      },
      'email',
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
