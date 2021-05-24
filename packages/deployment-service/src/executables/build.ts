import { PipelineModel, TaskModel } from '@/models'
import { ExecutableType } from './executable'

export const build: ExecutableType = (task: TaskModel, pipeline: PipelineModel): Promise<boolean> => {
  //TODO get codebase from S3 bucket

  console.log('executable', task, pipeline)

  return Promise.resolve(true)
}
