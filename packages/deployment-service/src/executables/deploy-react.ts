import { TaskEntity } from './../entities'
import { ExecutableType } from './executable'

export const deployReact: ExecutableType = (task: TaskEntity): Promise<boolean> => {
  console.log('executable', task)

  return Promise.resolve(true)
}
