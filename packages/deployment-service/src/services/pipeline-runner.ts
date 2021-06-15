import { PipelineRunnerModel } from '../models'
import { db } from '@/core'

export const createPipelineRunnerModel = (dto: Partial<PipelineRunnerModel>): Promise<PipelineRunnerModel> => {
  return db.put(Object.assign(new PipelineRunnerModel(), dto))
}

export const updatePipelineRunnerModel = (
  model: PipelineRunnerModel,
  dto: Partial<PipelineRunnerModel>,
): Promise<PipelineRunnerModel> => {
  return db.put(
    Object.assign(new PipelineRunnerModel(), {
      ...model,
      ...dto,
      modified: new Date().toISOString(),
    }),
  )
}

export const findPipelineRunnerById = (id: string): Promise<PipelineRunnerModel> => {
  return db.get(
    Object.assign(new PipelineRunnerModel(), {
      id,
    }),
  )
}
