import { PipelineEntity, TaskEntity } from '../entities'
import { ExecutableType } from './executable'
import { exec } from 'child_process'
import { cloneDir } from '../utils'

export const install: ExecutableType = async (task: TaskEntity, pipeline: PipelineEntity): Promise<true | never> => {
  console.log('installing...')
  console.log('executable', task)

  try {
    // TODO optional yarn usage
    await exec(`HOME="${cloneDir(pipeline)}" npm install --prefix="${cloneDir(pipeline)}"`, (error, stdout) => {
      if (error) {
        throw error
      }

      console.log('npm stdout:=> ', stdout)
    })
    // result && console.log('npm', result.toString())
  } catch (e) {
    console.log('npm errors')
    console.error(e)
    console.log(e?.output?.toString())
    throw e
  }

  return Promise.resolve(true)
}
