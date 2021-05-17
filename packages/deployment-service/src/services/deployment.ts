import { DeploymentDto } from '../dto'
import { DeploymentModel } from '../models'
import { db } from './../core'
import { QueryPaginator } from '@aws/dynamodb-data-mapper'

export const createDeploymentModel = (dto: Partial<DeploymentModel>): Promise<DeploymentModel> => {
  return db.put(Object.assign(new DeploymentModel(), dto))
}

export const updateDeploymentModel = (model: DeploymentModel, dto: DeploymentDto): Promise<DeploymentModel> => {
  return db.put(
    Object.assign(new DeploymentModel(), {
      ...model,
      ...dto,
      modified: new Date().toISOString(),
    }),
  )
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
  developerId: string,
  startKey?: { [s: string]: string },
): Promise<QueryPaginator<DeploymentModel>> => {
  return db
    .query(
      DeploymentModel,
      {
        organisationId,
        developerId,
      },
      {
        limit: 10,
        startKey,
      },
    )
    .pages()
}
