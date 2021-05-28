import { DeploymentDto } from '@/dto'
import { DeploymentModel } from '@/models'
import { db } from '@/core'
import { QueryIterator } from '@aws/dynamodb-data-mapper'

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

export const getByKey = (id: string): Promise<DeploymentModel | undefined> => {
  return db.get(Object.assign(new DeploymentModel(), { id }))
}

export const batchGet = async (
  developerId: string,
  startKey?: { [s: string]: string },
): Promise<[QueryIterator<DeploymentModel>, { nextCursor: string }]> => {
  const dynamoResponse = await db.query(
    DeploymentModel,
    {
      developerId,
    },
    {
      indexName: 'developerIdOwnership',
      limit: 10,
      startKey,
    },
  )

  return [
    dynamoResponse,
    {
      nextCursor: '',
    },
  ]
}
