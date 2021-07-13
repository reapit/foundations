import { TaskEntity } from './../entities'
import { ExecutableType } from './executable'

export const pull: ExecutableType = (task: TaskEntity): Promise<true | never> => {
  console.log('pull...')
  console.log('executable', task)

  return Promise.resolve(true)
}
