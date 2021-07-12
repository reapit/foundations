import { TaskEntity } from './../entities'
import { ExecutableType } from './executable'

export const build: ExecutableType = (task: TaskEntity): Promise<true | never> => {
  //TODO get codebase from S3 bucket
  console.log('building...')

  console.log('executable', task)

  return Promise.resolve(true)
}
