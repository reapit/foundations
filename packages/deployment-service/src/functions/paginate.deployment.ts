import { httpHandler, UnauthorizedException } from '@homeservenow/serverless-aws-handler'
import { DeploymentModel } from '@/models'
import * as service from '@/services/deployment'
import { QueryPaginator } from '@aws/dynamodb-data-mapper'
import { authorised } from '@/utils'
import { connectSessionVerifyDecodeIdToken, LoginIdentity } from '@reapit/connect-session'

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
    let customer: LoginIdentity | undefined

    try {
      customer = await connectSessionVerifyDecodeIdToken(
        event.headers['reapit-connect-token'] as string,
        process.env.CONNECT_USER_POOL as string,
      )
    } catch (e) {
      throw new UnauthorizedException(e.message)
    }

    return service.batchGet(customer?.developerId as string, customer?.orgId as string | undefined)
  },
})
