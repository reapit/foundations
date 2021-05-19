import { PipelineModel } from '@/models'
import { db } from '@/core'

export const createPipelineModel = (dto: Partial<PipelineModel>): Promise<PipelineModel> => {
  return db.put(Object.assign(new PipelineModel(), dto))
}

export const updatePipelineModel = (model: PipelineModel, dto: Partial<PipelineModel>): Promise<PipelineModel> => {
  return db.put(
    Object.assign(new PipelineModel(), {
      ...model,
      ...dto,
      modified: new Date().toISOString(),
    }),
  )
}

export const findById = (id: string): Promise<PipelineModel> => {
  return db.get(
    Object.assign(new PipelineModel(), {
      id,
    }),
  )
}
