import { DeploymentDto } from '../dto'
import { DeploymentModel } from '../models'
import { db } from './../core'
import { QueryPaginator } from '@aws/dynamodb-data-mapper'

export const createDeploymentModel = (dto: DeploymentDto): Promise<DeploymentModel> => {
  return db.put({
    ...dto,
    create: new Date().toISOString(),
    apiKey: '', // TODO solve api key, think every propert on model with key value (or is that GSI I'm thinking of?)
  })
}

export const updateDeploymentModel = (model: DeploymentModel, dto: DeploymentDto): Promise<DeploymentModel> => {
  return db.put({
    ...model,
    ...dto,
    modified: new Date().toISOString(),
    apiKey: '', // TODO solve api key
  })
}

export const deleteDeploymentModel = async (model: DeploymentModel): Promise<void> => {
  await db.delete(model)
}

export const getByKey = (apiKey: string): Promise<DeploymentModel | undefined> => {
  return db.get({
    apiKey,
  })
}

export const batchGet = async (
  organisationId: string,
  startKey?: { [s: string]: string },
): Promise<QueryPaginator<DeploymentModel>> => {
  return db
    .query(
      DeploymentModel,
      {
        organisationId,
      },
      {
        limit: 10,
        startKey,
      },
    )
    .pages()
}
