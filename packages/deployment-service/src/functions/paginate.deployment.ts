import { httpHandler } from '@homeservenow/serverless-aws-handler'
import { DeploymentModel } from '../models'
import * as service from './../services/deployment'
import { QueryPaginator } from '@aws/dynamodb-data-mapper'
import { authorised, decodeToken } from './../utils'

/**
 * Return pagination response for signed in user
 */
export const paginateDeployments = httpHandler({
  serialise: {
    input: (event) => {
      authorised(event)
    },
  },
  handler: async ({ event }): Promise<QueryPaginator<DeploymentModel>> => {
    const customer = decodeToken(event.headers['reapit-connect-token'] as string)
    const organisationId = customer['custom:reapit:orgId']
    const developerId = customer['custom:reapit:developerId']

    return service.batchGet(organisationId, developerId)
  },
})
