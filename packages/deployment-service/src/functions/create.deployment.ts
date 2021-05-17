import { httpHandler, ValidationException } from '@homeservenow/serverless-aws-handler'
import { DeploymentDto } from '../dto'
import { DeploymentModel } from '../models'
import * as service from './../services/deployment'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

/**
 * Create a deployment
 */
export const createDeployment = httpHandler<DeploymentDto, DeploymentModel>({
  serialise: {
    input: (event: any): DeploymentDto => {
      return plainToClass(DeploymentDto, event.body)
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
    return service.createDeploymentModel(body)
  },
})
