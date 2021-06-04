import { httpHandler, NotFoundException, ValidationException } from '@homeservenow/serverless-aws-handler'
import { DeploymentDto } from '@/dto'
import { DeploymentModel } from '@/models'
import * as service from '@/services/deployment'
import { validate } from 'class-validator'
import { ownership, resolveDeveloperId } from '@/utils'

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
    const developerId = await resolveDeveloperId(event)

    const deployment = await service.getByKey(event.pathParameters?.id as string) // TODO should this be body.toApiKey

    if (!deployment) {
      throw new NotFoundException()
    }

    await ownership(deployment.developerId, developerId)

    return service.updateDeploymentModel(deployment, body)
  },
})
