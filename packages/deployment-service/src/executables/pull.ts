import { PipelineEntity, TaskEntity } from './../entities'
import { ExecutableType } from './executable'
import fs from 'fs'
import { developerDir, cloneDir } from '../utils'
import { spawn } from 'child_process'

export const pull: ExecutableType = async (task: TaskEntity, pipeline: PipelineEntity): Promise<true | never> => {
  console.log('pull...')
  console.log('executable', task)

  try {
    process.env.GIT_SSH_COMMAND = 'ssh -o StrictHostKeyChecking=no'

    if (!fs.existsSync(developerDir(pipeline))) {
      fs.mkdirSync(developerDir(pipeline), {
        recursive: true,
      })
    }

    if (fs.existsSync(cloneDir(pipeline))) {
      fs.rmSync(cloneDir(pipeline), {
        recursive: true,
      })
    }

    const returned = await new Promise((resolve, reject) => {
      const result = spawn('git', ['clone', pipeline.repository as string, cloneDir(pipeline)])

      result.on('message', (message) => console.log('message', message))
      result.on('error', (code) => reject({ code, result: 'error' }))
      result.on('exit', (code) => resolve({ code, result: 'exit' }))
      result.on('close', (code) => resolve({ code, result: 'close' }))
      result.stdout.on('data', (s) => console.log('stdout', s))
      result.stderr.on('data', (e) => console.log('error message', e.toString()))
    })

    console.log('returned', returned)
  } catch (e) {
    console.log('message', e.message)
    console.log('clone failed')
    throw e
  }

  return Promise.resolve(true)
}
