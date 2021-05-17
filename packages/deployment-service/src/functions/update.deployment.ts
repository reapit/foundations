import { httpHandler, NotFoundException, ValidationException } from '@homeservenow/serverless-aws-handler'
import { DeploymentDto } from '../dto'
import { DeploymentModel } from '../models'
import * as service from './../services/deployment'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { authorised } from './../utils'

/**
 * Update a given deployment
 */
export const updateDeployment = httpHandler<DeploymentDto, DeploymentModel>({
  serialise: {
    input: (event): DeploymentDto => {
      authorised(event)

      if (!event.pathParameters?.id) {
        throw new NotFoundException()
      }

      return event.body ? plainToClass(DeploymentDto, JSON.parse(event.body)) : new DeploymentDto()
    },
  },
  validator: async (dto: DeploymentDto): Promise<DeploymentDto> => {
    const errors = await validate(dto)

    if (errors.length >= 1) {
      throw new ValidationException(errors as any)
    }

    return dto
  },
  handler: async ({ body, event }): Promise<DeploymentModel> => {
    const deployment = await service.getByKey(event.pathParameters?.id as string) // TODO should this be body.toApiKey

    if (!deployment) {
      throw new NotFoundException()
    }

    return service.updateDeploymentModel(deployment, body)
  },
})
