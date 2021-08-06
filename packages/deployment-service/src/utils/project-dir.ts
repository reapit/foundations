import { resolve } from 'path'
import { PipelineEntity } from './../entities'

export const projectDir = (dir: string, pipeline: PipelineEntity) =>
  resolve(dir, `${(pipeline.repository as string).split('/').pop()}-master`)

export const developerDir = (pipeline: PipelineEntity): string => `/mnt/efs1/project/${pipeline.developerId}/`
export const cloneDir = (pipeline: PipelineEntity): string =>
  `${developerDir(pipeline)}${pipeline.repository?.split('/').pop()}`
