import { PipelineEntity, TaskEntity } from 'src/entities'
import { ExecutableType } from './executable'
import { execSync } from 'child_process'
import { cloneDir } from '../utils'

export const install: ExecutableType = async (task: TaskEntity, pipeline: PipelineEntity): Promise<true | never> => {
  console.log('installing...')
  console.log('executable', task)

  try {
    // TODO optional yarn usage
    const yarn = execSync('npm i', {
      cwd: cloneDir(pipeline),
    })
    yarn && console.log('yarn', yarn.toString())
  } catch (e) {
    console.log('yarn errors', e)
    console.log(e.output.toString())
    throw e
  }

  return Promise.resolve(true)
}
