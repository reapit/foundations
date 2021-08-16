import { PipelineEntity, TaskEntity } from './../entities'
import { ExecutableType } from './executable'
import { spawn } from 'child_process'
import { cloneDir } from './../utils/project-dir'

export const build: ExecutableType = async (task: TaskEntity, pipeline: PipelineEntity): Promise<true | never> => {
  //TODO get codebase from S3 bucket
  console.log('building...')

  console.log('executable', task)

  try {
    // TODO use pipeline.buildCommand

    const returned = await new Promise((resolve, reject) => {
      const result = spawn('npm run', [pipeline.buildCommand as string], {
        cwd: cloneDir(pipeline),
      })

      result.on('message', (message) => console.log('message', message))
      result.on('error', (code) => reject({ code, result: 'error' }))
      result.on('exit', (code) => resolve({ code, result: 'exit' }))
      result.on('close', (code) => resolve({ code, result: 'close' }))
      result.stdout.on('data', (s) => console.log('stdout', s))
      result.stderr.on('data', (e) => console.log('error message', e.toString()))
    })

    console.log('build', returned)
  } catch (e) {
    console.log('yarn build errors')
    console.error(e)
    console.log('npm build failed')
    throw e
  }

  return Promise.resolve(true)
}
