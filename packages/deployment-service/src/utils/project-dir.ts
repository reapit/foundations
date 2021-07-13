import { resolve } from 'path'
import { PipelineEntity } from './../entities'

export const projectDir = (dir: string, pipeline: PipelineEntity) =>
  resolve(dir, `${(pipeline.repository as string).split('/').pop()}-master`)
