import {
  httpHandler,
  NotFoundException,
  UnauthorizedException,
  ValidationException,
} from '@homeservenow/serverless-aws-handler'
import { DeploymentDto } from '@/dto'
import { DeploymentModel } from '@/models'
import * as service from '@/services/deployment'
import { validate } from 'class-validator'
import { ownership } from '@/utils'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'
import publicKeys from './../../publicKeys.json'

/**
 * Update a given deployment
 */
export const updateDeployment = httpHandler<DeploymentDto, DeploymentModel>({
  validator: async (dto: DeploymentDto): Promise<DeploymentDto> => {
    const errors = await validate(dto)

    if (errors.length >= 1) {
      throw new ValidationException(errors as any)
    }

    return dto
  },
  handler: async ({ body, event }): Promise<DeploymentModel> => {
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

    const deployment = await service.getByKey(event.pathParameters?.id as string) // TODO should this be body.toApiKey

    if (!deployment) {
      throw new NotFoundException()
    }

    await ownership(deployment.developerId, customer)

    return service.updateDeploymentModel(deployment, body)
  },
})
