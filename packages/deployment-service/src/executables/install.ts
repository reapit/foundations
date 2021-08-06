import { PipelineEntity, TaskEntity } from '../entities'
import { ExecutableType } from './executable'
import { spawn } from 'child_process'
import { cloneDir } from '../utils'

export const install: ExecutableType = async (task: TaskEntity, pipeline: PipelineEntity): Promise<true | never> => {
  console.log('installing...')
  console.log('executable', task)

  try {
    // TODO optional yarn usage
    const returned = await new Promise((resolve, reject) => {
      const result = spawn('npm', ['install', '--no-bin-links'], {
        cwd: cloneDir(pipeline),
      })

      result.on('message', (message) => console.log('message', message))
      result.on('error', (code) => reject({ code, result: 'error' }))
      result.on('exit', (code) => resolve({ code, result: 'exit' }))
      result.on('close', (code) => resolve({ code, result: 'close' }))
      result.stdout.on('data', (s) => console.log('stdout', s))
      result.stderr.on('data', (e) => console.log('error message', e.toString()))
    })

    console.log('npm', returned)
  } catch (e) {
    console.log('npm errors')
    console.error(e)
    console.log(e?.output?.toString())
    throw e
  }

  return Promise.resolve(true)
}
