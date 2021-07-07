import { PipelineEntity } from './../entities/pipeline.entity'
import { TaskEntity } from './../entities/task.entity'
import { ExecutableType } from './executable'

export const build: ExecutableType = (task: TaskEntity, pipeline: PipelineEntity): Promise<boolean> => {
  //TODO get codebase from S3 bucket

  console.log('executable', task, pipeline)

  return Promise.resolve(true)
}
