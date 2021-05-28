import { PipelineModel } from '@/models'
import { ownership } from '@/utils'
import { httpHandler, NotFoundException, UnauthorizedException } from '@homeservenow/serverless-aws-handler'
import * as service from './../services'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'
import publicKeys from './../../publicKeys.json'

/**
 * Create a new pipeline for deployment
 *
 * Cancels all existing running pipelines
 */
export const createPipeline = httpHandler<void, PipelineModel>({
  handler: async ({ event }): Promise<PipelineModel> => {
    const deploymentId = event.pathParameters?.deploymentId

    if (!deploymentId) {
      throw new NotFoundException()
    }

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

    const deployment = await service.getByKey(deploymentId)

    if (!deployment) {
      throw new NotFoundException()
    }

    await ownership(deployment.developerId, customer)

    return service.createPipelineModel({
      deploymentId,
    })
  },
})
