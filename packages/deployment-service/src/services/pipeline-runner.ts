import { PipelineRunnerEntity } from '../entities'
import { db } from '@/core'

export const createPipelineRunnerEntity = (dto: Partial<PipelineRunnerEntity>): Promise<PipelineRunnerEntity> => {
  return db.put(Object.assign(new PipelineRunnerEntity(), dto))
}

export const updatePipelineRunnerEntity = (
  model: PipelineRunnerEntity,
  dto: Partial<PipelineRunnerEntity>,
): Promise<PipelineRunnerEntity> => {
  return db.put(
    Object.assign(new PipelineRunnerEntity(), {
      ...model,
      ...dto,
      modified: new Date().toISOString(),
    }),
  )
}

export const findPipelineRunnerById = (id: string): Promise<PipelineRunnerEntity> => {
  return db.get(
    Object.assign(new PipelineRunnerEntity(), {
      id,
    }),
  )
}
