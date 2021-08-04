import { PipelineEntity, TaskEntity } from './../entities'
import { ExecutableType } from './executable'
import { execSync } from 'child_process'
import { cloneDir } from './../utils/project-dir'

export const build: ExecutableType = (task: TaskEntity, pipeline: PipelineEntity): Promise<true | never> => {
  //TODO get codebase from S3 bucket
  console.log('building...')

  console.log('executable', task)

  try {
    const build = execSync('npm run build', {
      cwd: cloneDir(pipeline),
    })
    console.log('yarn build', build.toString())
  } catch (e) {
    console.log('yarn build errors')
    console.error(e)
    console.log('npm build failed')
    throw e
  }

  return Promise.resolve(true)
}
