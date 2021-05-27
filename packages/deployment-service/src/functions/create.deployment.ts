import { httpHandler, UnauthorizedException, ValidationException } from '@homeservenow/serverless-aws-handler'
import { DeploymentDto } from '@/dto'
import { DeploymentModel } from '@/models'
import * as service from '@/services/deployment'
import { plainToClass, classToClassFromExist } from 'class-transformer'
import { validate } from 'class-validator'
import { authorised } from '@/utils'
import { connectSessionVerifyDecodeIdToken, LoginIdentity } from '@reapit/connect-session'

/**
 * Create a deployment
 */
export const createDeployment = httpHandler<DeploymentDto, DeploymentModel>({
  serialise: {
    input: async (event): Promise<DeploymentDto> => {
      authorised(event)
      let customer: LoginIdentity | undefined

      try {
        customer = await connectSessionVerifyDecodeIdToken(
          event.headers['reapit-connect-token'] as string,
          process.env.CONNECT_USER_POOL as string,
        )
      } catch (e) {
        throw new UnauthorizedException(e.message)
      }

      return event.body
        ? plainToClass(DeploymentDto, {
            ...JSON.parse(event.body),
            organisationId: customer?.orgId,
            developerId: customer?.developerId,
          })
        : new DeploymentDto()
    },
  },
  validator: async (dto: DeploymentDto): Promise<DeploymentDto> => {
    const errors = await validate(dto)

    if (errors.length >= 1) {
      throw new ValidationException(errors as any)
    }

    return dto
  },
  handler: async ({ body }): Promise<DeploymentModel> => {
    const model = classToClassFromExist<DeploymentModel>(new DeploymentModel(), body)
    return service.createDeploymentModel(model)
  },
})
