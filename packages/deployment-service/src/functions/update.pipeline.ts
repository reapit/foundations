import { PipelineModel } from '@/models'
import { authorised, ownership } from '@/utils'
import {
  httpHandler,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@homeservenow/serverless-aws-handler'
import { DeploymentStatus } from '@reapit/foundations-ts-definitions'
import * as service from './../services'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'
import publicKeys from './../../publicKeys.json'

/**
 * Update a pipeline (cancel)
 */
// TODO refactor to delete method instead?
export const updatePipeline = httpHandler<{ buildStatus: DeploymentStatus.CANCELED }, PipelineModel>({
  serialise: {
    input: (event) => {
      authorised(event)
    },
  },
  validator: (payload) => {
    if (payload.buildSTatus && payload.buildSTatus !== DeploymentStatus.CANCELED) {
      throw new BadRequestException('Validation errors: Status can only be canceled')
    }

    return payload
  },
  handler: async ({ event, body }): Promise<PipelineModel> => {
    let customer: LoginIdentity | undefined

    try {
      customer = await connectSessionVerifyDecodeIdTokenWithPublicKeys(
        event.headers.Authorization as string,
        process.env.CONNECT_USER_POOL as string,
        publicKeys,
      )

      if (typeof customer === 'undefined' || !customer.developerId) {
        throw new Error('Unauthorised')
      }
    } catch (e) {
      throw new UnauthorizedException(e.message)
    }

    const pipeline = await service.findById(event.pathParameters?.id as string)

    if (!pipeline || typeof pipeline.deployment === 'undefined') {
      throw new NotFoundException()
    }

    await ownership(pipeline.deployment.id as string, customer)

    if (pipeline.buildStatus !== DeploymentStatus.RUNNING) {
      return pipeline
    }

    return service.updatePipelineModel(pipeline, body)
  },
})
