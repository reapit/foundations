import { PipelineEntity, TaskEntity } from './../entities'
import { ExecutableType } from './executable'

export const pull: ExecutableType = (task: TaskEntity, pipeline: PipelineEntity): Promise<boolean> => {
  console.log('executable', task, pipeline)

  return Promise.resolve(true)
}
