import { TaskEntity } from './../entities'
import { ExecutableType } from './executable'

export const deployNode: ExecutableType = (task: TaskEntity): Promise<true | never> => {
  console.log('deploying lambdas...')
  console.log('executable', task)

  return Promise.resolve(true)
}
