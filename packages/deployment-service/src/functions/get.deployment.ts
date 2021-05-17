import { httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import { DeploymentModel } from '../models'
import * as service from './../services/deployment'

/**
 * Get a deployment by id
 */
export const getDeployment = httpHandler(
  async ({ event }): Promise<DeploymentModel> => {
    const deployment = await service.getByKey(event.pathParameters?.id as string)

    if (!deployment) {
      throw new NotFoundException()
    }

    return deployment
  },
)
