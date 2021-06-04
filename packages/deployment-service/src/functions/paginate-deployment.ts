import { httpHandler } from '@homeservenow/serverless-aws-handler'
import { DeploymentModel } from '@/models'
import * as service from '@/services/deployment'
import { resolveDeveloperId } from '@/utils'

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
    const developerId = await resolveDeveloperId(event)

    const response = await service.batchGet(
      developerId,
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
