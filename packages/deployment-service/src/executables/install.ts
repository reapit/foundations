import { PipelineEntity, TaskEntity } from '../entities'
import { ExecutableType } from './executable'
import { spawn } from 'child_process'
import { cloneDir } from '../utils'

export const install: ExecutableType = async (task: TaskEntity, pipeline: PipelineEntity): Promise<true | never> => {
  console.log('installing...')
  console.log('executable', task)
  process.env.GIT_SSH_COMMAND = 'ssh -o StrictHostKeyChecking=no'
  process.env.HOME = '/tmp/npm/'

  // TODO add package-lock-only no-audit

  try {
    // TODO optional yarn usage
    const returned = await new Promise<any>((resolve, reject) => {
      const result = spawn('npm', ['install', '--cache /tmp/cache', '--force'], {
        cwd: cloneDir(pipeline),
      })

      result.on('message', (message) => console.log('message', message))
      result.on('error', (code) => reject({ code, result: 'error' }))
      result.on('exit', (code) => resolve({ code, result: 'exit' }))
      result.on('close', (code) => resolve({ code, result: 'close' }))
      result.stdout.on('data', (s) => console.log('stdout', s.toString()))
      result.stderr.on('data', (e) => console.log('error message', e.toString()))
    })

    if (returned?.code && returned.code !== 0) {
      throw new Error('none 0 error code')
    }

    console.log('npm returned value', returned)
  } catch (e) {
    console.log('npm errors')
    console.error(e)
    console.log(e?.output?.toString())
    throw e
  }

  return Promise.resolve(true)
}
