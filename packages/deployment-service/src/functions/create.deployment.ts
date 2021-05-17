import { httpHandler, ValidationException } from '@homeservenow/serverless-aws-handler'
import { DeploymentDto } from '../dto'
import { DeploymentModel } from '../models'
import * as service from './../services/deployment'
import { plainToClass, classToClassFromExist } from 'class-transformer'
import { validate } from 'class-validator'
import { authorised } from './../utils'
import { decodeToken } from '@/utils/decode.token'

/**
 * Create a deployment
 */
export const createDeployment = httpHandler<DeploymentDto, DeploymentModel>({
  serialise: {
    input: (event): DeploymentDto => {
      authorised(event)
      const customer = decodeToken(event.headers['reapit-connect-token'] as string)
      const organisationId = customer['custom:reapit:orgId']
      const developerId = customer['custom:reapit:developerId']

      return event.body
        ? plainToClass(DeploymentDto, {
            ...JSON.parse(event.body),
            organisationId,
            developerId,
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
