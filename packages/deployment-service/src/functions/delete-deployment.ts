import {
  httpHandler,
  NotFoundException,
  HttpStatusCode,
  UnauthorizedException,
} from '@homeservenow/serverless-aws-handler'
import * as service from '@/services/deployment'
import { ownership } from '@/utils'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'
import publicKeys from './../../public-keys.json'
/**
 * Delete a deployment
 */
export const deleteDeployment = httpHandler({
  defaultStatusCode: HttpStatusCode.NO_CONTENT,
  handler: async ({ event }): Promise<void> => {
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

    await service.deleteDeploymentModel(deployment)
  },
})
