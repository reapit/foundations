import { PipelineDto } from '../dto'
import { PipelineEntity } from '../entities'
import { db } from '../core'
import { QueryIterator } from '@aws/dynamodb-data-mapper'

export const createPipelineEntity = (dto: Partial<PipelineEntity>): Promise<PipelineEntity> => {
  return db.put(Object.assign(new PipelineEntity(), dto))
}

export const updatePipelineEntity = (model: PipelineEntity, dto: PipelineDto): Promise<PipelineEntity> => {
  return db.put(
    Object.assign(new PipelineEntity(), {
      ...model,
      ...dto,
      modified: new Date().toISOString(),
    }),
  )
}

export const deletePipelineEntity = async (model: PipelineEntity): Promise<void> => {
  await db.delete(model)
}

export const findPipelineById = (id: string): Promise<PipelineEntity | undefined> => {
  return db.get(Object.assign(new PipelineEntity(), { id }))
}

export const batchGetPipelines = async (
  developerId: string,
  startKey?: Partial<PipelineEntity>,
): Promise<[QueryIterator<PipelineEntity>, { nextCursor: string }]> => {
  const dynamoResponse = await db.query(
    PipelineEntity,
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
