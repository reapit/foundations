import { httpHandler, UnauthorizedException } from '@homeservenow/serverless-aws-handler'
import { DeploymentModel } from '@/models'
import * as service from '@/services/deployment'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'
import publicKeys from './../../publicKeys.json'

type Pagintation<T> = {
  items: T[]
  meta: {
    // count: number
    nextCursor: string
  }
}

/**
 * Return pagination response for signed in user
 */
export const paginateDeployments = httpHandler({
  handler: async ({ event }): Promise<Pagintation<DeploymentModel>> => {
    let customer: LoginIdentity | undefined

    try {
      customer = await connectSessionVerifyDecodeIdTokenWithPublicKeys(
        event.headers.Authorization as string,
        process.env.CONNECT_USER_POOL as string,
        publicKeys,
      )

      if (typeof customer === 'undefined' || !customer.developerId) {
        throw new Error('Unauthorised')
      }
    } catch (e) {
      throw new UnauthorizedException(e.message)
    }
    const response = await service.batchGet(
      customer.developerId,
      event?.queryStringParameters?.nextCursor ? { id: event?.queryStringParameters?.nextCursor } : undefined,
    )

    const pagination: Pagintation<DeploymentModel> = {
      items: [],
      meta: response[1],
    }

    for await (const apiKey of response[0]) {
      pagination.items.push(apiKey)
    }

    return pagination
  },
})
