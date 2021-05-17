import { httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import { DeploymentModel } from '@/models'
import * as service from '@/services/deployment'
import { authorised, ownership } from '@/utils'

/**
 * Get a deployment by id
 */
export const getDeployment = httpHandler({
  serialise: {
    input: (event) => {
      authorised(event)
    },
  },
  handler: async ({ event }): Promise<DeploymentModel> => {
    const deployment = await service.getByKey(event.pathParameters?.id as string)

    if (!deployment) {
      throw new NotFoundException()
    }

    ownership(deployment, event.headers)

    return deployment
  },
})
