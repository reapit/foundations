import { getApiKey, removeApiKey as remove } from '../services'
import {
  httpHandler,
  HttpStatusCode,
  NotFoundException,
  UnauthorizedException,
} from '@homeservenow/serverless-aws-handler'
import { LoginIdentity } from '@reapit/connect-session'
import { defaultOutputHeaders } from './../constants'
import { resolveCustomer } from '../services/resolve-customer'

export const deleteApiKey = httpHandler({
  defaultOutputHeaders,
  defaultStatusCode: HttpStatusCode.NO_CONTENT,
  handler: async ({ event }): Promise<void> => {
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
