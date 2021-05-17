import { httpHandler } from '@homeservenow/serverless-aws-handler'
import { DeploymentModel } from '../models'
import * as service from './../services/deployment'

/**
 * Return pagination response for signed in user
 */
export const paginateDeployments = httpHandler(
  async ({ event }): Promise<DeploymentModel[]> => {
    // TODO find authentication info and return deployments by organisationId

    const authorised = event.headers.authorization

    // TODO find the organisationId from authorised header
    const { organisationId } = authorised

    return service.batchGet(organisationId)
  },
)
