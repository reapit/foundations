import { PipelineDto } from '../dto'
import { PipelineModel } from '../models'
import { db } from '../core'
import { QueryIterator } from '@aws/dynamodb-data-mapper'

export const createPipelineModel = (dto: Partial<PipelineModel>): Promise<PipelineModel> => {
  return db.put(Object.assign(new PipelineModel(), dto))
}

export const updatePipelineModel = (model: PipelineModel, dto: PipelineDto): Promise<PipelineModel> => {
  return db.put(
    Object.assign(new PipelineModel(), {
      ...model,
      ...dto,
      modified: new Date().toISOString(),
    }),
  )
}

export const deletePipelineModel = async (model: PipelineModel): Promise<void> => {
  await db.delete(model)
}

export const findPipelineById = (id: string): Promise<PipelineModel | undefined> => {
  return db.get(Object.assign(new PipelineModel(), { id }))
}

export const batchGetPipelines = async (
  developerId: string,
  startKey?: Partial<PipelineModel>,
): Promise<[QueryIterator<PipelineModel>, { nextCursor: string }]> => {
  const dynamoResponse = await db.query(
    PipelineModel,
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
