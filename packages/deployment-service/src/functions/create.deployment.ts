import { httpHandler, UnauthorizedException, ValidationException } from '@homeservenow/serverless-aws-handler'
import { DeploymentDto } from '@/dto'
import { DeploymentModel } from '@/models'
import * as service from '@/services/deployment'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'
import publicKeys from './../../publicKeys.json'

/**
 * Create a deployment
 */
export const createDeployment = httpHandler<DeploymentDto, DeploymentModel>({
  validator: async (dto: DeploymentDto): Promise<DeploymentDto> => {
    const errors = await validate(dto)

    if (errors.length >= 1) {
      throw new ValidationException(errors as any)
    }

    return dto
  },
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

    const dto = event.body
      ? plainToClass(DeploymentDto, {
          ...JSON.parse(event.body),
          organisationId: customer?.orgId,
          developerId: customer?.developerId,
        })
      : new DeploymentDto()

    return service.createDeploymentModel(dto)
  },
})
