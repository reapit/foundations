import { httpHandler } from '@homeservenow/serverless-aws-handler'
import { DeploymentModel } from '../models'
import * as service from './../services/deployment'
import { QueryPaginator } from '@aws/dynamodb-data-mapper'

/**
 * Return pagination response for signed in user
 */
export const paginateDeployments = httpHandler(
  async ({ event }): Promise<QueryPaginator<DeploymentModel>> => {
    // TODO find authentication info and return deployments by organisationId

    const token = event.headers['reapit-token']

    console.log('token', token)

    // TODO find the organisationId from authorised header
    const organisationId = ''

    return service.batchGet(organisationId)
  },
)
