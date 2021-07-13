import { PipelineEntity, TaskEntity } from 'src/entities'
import { ExecutableType } from './executable'
import { execSync } from 'child_process'
import { projectDir } from './../utils/project-dir'
import { dir } from './../constants'

export const install: ExecutableType = async (task: TaskEntity, pipeline: PipelineEntity): Promise<true | never> => {
  console.log('installing...')
  console.log('executable', task)

  // TODO check folder etc still exists in context

  const projectDirName = projectDir(dir, pipeline)

  try {
    // TODO optional yarn usage
    const yarn = execSync('npm i', {
      cwd: projectDirName,
    })
    yarn && console.log('yarn', yarn.toString())
  } catch (e) {
    console.log('yarn errors', e)
    console.log(e.output.toString())
    throw e
  }

  return Promise.resolve(true)
}
