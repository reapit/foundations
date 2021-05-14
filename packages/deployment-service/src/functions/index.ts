import { httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import { DeploymentDto } from '../dto'
import { DeploymentModel } from '../models'
import * as service from './../services/deployment'

/**
 * Create a deployment
 */
export const createDeployment = httpHandler<DeploymentDto>({
  validator: (payload: any): DeploymentDto => {

    // TODO validate with class-validator
    return toClass(DeploymentDto, payload)
  },
  handler: async ({body}): Promise<DeploymentModel> => {
    return service.createDeploymentModel(body)
  },
});

/**
 * Update a given deployment
 */
export const updateDeployment = httpHandler({
  validator: (payload: any): DeploymentDto => {

    // TODO validate with class-validator
    return toClass(DeploymentDto, payload)
  },
  handler: async ({body, event}): Promise<DeploymentModel> => {
    const deployment = await service.getByKey(event.parameters.id) // TODO should this be body.toApiKey

    if (!deployment) {
      throw new NotFoundException()
    }

    return service.updateDeploymentModel(deployment, body)
  },
})

/**
 * Delete a deployment
 */
export const deleteDeployment = httpHandler(async ({event}): Promise<void> => {
  const deployment = await service.getByKey(event.parameters.id)

  if (!deployment) {
    throw new NotFoundException()
  }

  await service.deleteDeploymentModel(deployment)
})

/**
 * Get a deployment by id
 */
export const getDeployment = httpHandler(async ({event}): Promise<DeploymentModel> => {
  const deployment = await service.getByKey(event.parameters.id)

  if (!deployment) {
    throw new NotFoundException()
  }

  return deployment
})

/**
 * Return pagination response for signed in user
 */
export const paginateDeployments = httpHandler(async ({event}): Promise<DeploymentModel[]> => {
  // TODO find authentication info and return deployments by organisationId
})
