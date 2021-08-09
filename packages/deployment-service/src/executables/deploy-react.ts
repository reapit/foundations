import { TaskEntity } from './../entities'
import { ExecutableType } from './executable'

// Add clean up step to remove created projects

export const deployReact: ExecutableType = (task: TaskEntity): Promise<true | never> => {
  console.log('deploying react...')
  console.log('executable', task)

  return Promise.resolve(true)
}
