import { PipelineModel } from "@/models";
import {db} from '@/core'

export const createPipelineModel = (dto: Partial<PipelineModel>): Promise<PipelineModel> => {
  return db.put(Object.assign(new PipelineModel(), dto))
}

export const updatePipelineModel = (model: PipelineModel, dto: Partial<PipelineModel>): Promise<PipelineModel> => {
  return db.put(Object.assign(new PipelineModel(), {
    ...model,
    ...dto,
  }))
}
