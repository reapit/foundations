import { PipelineEntity, TaskEntity } from './../entities'
import { ExecutableType } from './executable'

export const deployReact: ExecutableType = (task: TaskEntity, pipeline: PipelineEntity): Promise<boolean> => {
  console.log('executable', task, pipeline)

  return Promise.resolve(true)
}
