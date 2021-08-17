import { PipelineEntity, TaskEntity } from './../entities'
import { ExecutableType } from './executable'
import { spawn } from 'child_process'
import { cloneDir } from './../utils/project-dir'

export const build: ExecutableType = async (task: TaskEntity, pipeline: PipelineEntity): Promise<true | never> => {
  console.log('building...')

  console.log('executable', task)

  try {
    const returned = await new Promise<any>((resolve, reject) => {
      const result = spawn('npm', ['run', pipeline.buildCommand as string], {
        cwd: cloneDir(pipeline),
      })

      result.on('message', (message) => console.log('message', message))
      result.on('error', (code) => reject({ code, result: 'error' }))
      result.on('exit', (code) => resolve({ code, result: 'exit' }))
      result.on('close', (code) => resolve({ code, result: 'close' }))
      result.stdout.on('data', (s) => console.log('stdout', s.toString()))
      result.stderr.on('data', (e) => console.log('error message', e.toString()))
    })

    if (returned?.code && returned.code === 1) {
      throw new Error('none 0 error code')
    }

    console.log('build', returned)
  } catch (e) {
    console.error(e)
    console.log('npm build failed')
    throw e
  }

  return Promise.resolve(true)
}
