import { httpHandler, NotFoundException, UnauthorizedException } from '@homeservenow/serverless-aws-handler'
import { DeploymentModel } from '@/models'
import * as service from '@/services/deployment'
import { ownership } from '@/utils'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'
import publicKeys from './../../public-keys.json'

/**
 * Get a deployment by id
 */
export const getDeployment = httpHandler({
  handler: async ({ event }): Promise<DeploymentModel> => {
    let customer: LoginIdentity | undefined

    try {
      customer = await connectSessionVerifyDecodeIdTokenWithPublicKeys(
        event.headers['x-api-key'] as string,
        process.env.CONNECT_USER_POOL as string,
        publicKeys,
      )

      if (!customer) {
        throw new Error('unauthorised')
      }
    } catch (e) {
      throw new UnauthorizedException(e.message)
    }

    const deployment = await service.getByKey(event.pathParameters?.id as string)

    if (!deployment) {
      throw new NotFoundException()
    }

    await ownership(deployment.developerId, customer)

    return deployment
  },
})
