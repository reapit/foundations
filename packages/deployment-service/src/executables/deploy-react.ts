import { TaskEntity } from './../entities'
import { ExecutableType } from './executable'

export const deployReact: ExecutableType = (task: TaskEntity): Promise<true | never> => {
  console.log('deploying react...')
  console.log('executable', task)

  return Promise.resolve(true)
}
