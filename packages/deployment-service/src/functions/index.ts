import { httpHandler } from '@homeservenow/serverless-aws-handler'
import { DeploymentModel } from '../models'

/**
 * Create a deployment
 */
export const createDeployment = httpHandler(async ({event}): Promise<DeploymentModel> => {
  
});

/**
 * Update a given deployment
 */
export const updateDeployment = httpHandler(async ({event}): Promise<DeploymentModel> => {

})

/**
 * Delete a deployment
 */
export const deleteDeployment = httpHandler(async ({event}): Promise<void> => {

})

/**
 * Get a deployment by id
 */
export const getDeployment = httpHandler(async ({event}): Promise<DeploymentModel> => {

})

/**
 * Return pagination response for signed in user
 */
export const paginateDeployments = httpHandler(async ({event}): Promise<DeploymentModel[]> => {

})
