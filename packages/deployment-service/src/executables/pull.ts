import { PipelineEntity, TaskEntity } from './../entities'
import { ExecutableType } from './executable'
import { exec } from 'child_process'
import fs from 'fs'
import { developerDir, cloneDir } from '../utils'

export const pull: ExecutableType = async (task: TaskEntity, pipeline: PipelineEntity): Promise<true | never> => {
  console.log('pull...')
  console.log('executable', task)

  try {
    process.env.GIT_SSH_COMMAND = 'ssh -o StrictHostKeyChecking=no'

    // TODO solve SSH usage

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

    const child = exec(`git clone ${pipeline.repository} ${cloneDir(pipeline)}`, (error, stdout) => {
      if (error) {
        console.log('errored in callback')
        console.error(error)
        throw error
      }

      console.log('callback stdout:=> ', stdout)
    })

    child.on('message', (message) => console.log('stdout:=> ', message))

    const result = await new Promise<any>((resolve, reject) => {
      child.addListener('error', reject)
      child.addListener('exit', (code, signal) => resolve({ code, signal }))
    })

    console.log('pull - result', result)
  } catch (e) {
    console.log('message', e.message)
    console.log('clone failed')
    throw e
  }

  return Promise.resolve(true)
}
