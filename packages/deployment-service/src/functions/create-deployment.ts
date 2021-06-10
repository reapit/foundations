import { httpHandler, ValidationException } from '@homeservenow/serverless-aws-handler'
import { DeploymentDto } from '@/dto'
import { DeploymentModel } from '@/models'
import * as service from '@/services/deployment'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { resolveDeveloperId } from './../utils'

/**
 * Create a deployment
 */
export const createDeployment = httpHandler<DeploymentDto, DeploymentModel>({
  defaultOutputHeaders: {
    'Access-Control-Allow-Origin': '*',
  },
  validator: async (dto: DeploymentDto): Promise<DeploymentDto> => {
    const errors = await validate(dto)

    if (errors.length >= 1) {
      throw new ValidationException(errors as any)
    }

    return dto
  },
  handler: async ({ event }): Promise<DeploymentModel> => {
    const developerId = await resolveDeveloperId(event)

    const dto = event.body
      ? plainToClass(DeploymentDto, {
          ...JSON.parse(event.body),
          developerId,
        })
      : new DeploymentDto()

    return service.createDeploymentModel(dto)
  },
})
