import { PipelineEntity, TaskEntity } from './../entities'
import { ExecutableType } from './executable'
import { exec } from 'child_process'
import fs from 'fs'

export const pull: ExecutableType = async (task: TaskEntity, pipeline: PipelineEntity): Promise<true | never> => {
  console.log('pull...')
  console.log('executable', task)

  try {
    process.env.GIT_SSH_COMMAND = 'ssh -o StrictHostKeyChecking=no'

    // TODO solve SSH usage

    const developerDir = `/tmp/project/${pipeline.developerId}/`
    const cloneDir = `${developerDir}${pipeline.repository?.split('/').pop()}`

    if (!fs.existsSync(developerDir)) {
      fs.mkdirSync(developerDir, {
        recursive: true,
      })
    }

    const child = exec(`git clone ${pipeline.repository} ${cloneDir}`, (error, stdout) => {
      if (error) {
        console.log('errored in callback')
        console.error(error)
        throw error
      }

      console.log('callback stdout:=> ', stdout)
    })

    const result = await new Promise<any>((resolve, reject) => {
      child.addListener('message', (message) => console.log('stdout:=> ', message))
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
