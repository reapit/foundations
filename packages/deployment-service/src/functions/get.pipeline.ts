import { PipelineModel } from '@/models'
import { ownership } from '@/utils'
import { httpHandler, NotFoundException, UnauthorizedException } from '@homeservenow/serverless-aws-handler'
import * as service from './../services'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'
import publicKeys from './../../publicKeys.json'

/**
 * Get a pipeline by id
 */
export const getPipeline = httpHandler<void, PipelineModel>({
  handler: async ({ event }): Promise<PipelineModel> => {
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

    const pipeline = await service.findById(event.pathParameters?.id as string)

    if (!pipeline || typeof pipeline.deployment === 'undefined') {
      throw new NotFoundException()
    }

    await ownership(pipeline.deployment.id as string, customer)

    return pipeline
  },
})
