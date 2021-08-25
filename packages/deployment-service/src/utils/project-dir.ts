import { resolve } from 'path'
import { PipelineEntity } from './../entities'

export const projectDir = (dir: string, pipeline: PipelineEntity) =>
  resolve(dir, `${(pipeline.repository as string).split('/').pop()}-master`)

// const startDir = 'mnt/efs1'
const startDir = '/tmp'

export const developerDir = (pipeline: PipelineEntity): string => `/${startDir}/project/${pipeline.developerId}/`
export const cloneDir = (pipeline: PipelineEntity): string =>
  `${developerDir(pipeline)}${pipeline.repository?.split('/').pop()}`
