import { TaskEntity } from './../entities'
import { ExecutableType } from './executable'
import fs from 'fs'
import request from 'request'
import AdmZip from 'adm-zip'
import { resolve } from 'path'

const cloneDir = 'project'
const dir = resolve('/tmp', cloneDir)
const cloneZip = 'resource.zip'

const unzip = () => {
  const zip = new AdmZip(`${dir}/${cloneZip}`)
  zip.extractAllTo(`${dir}`, true)
}

export const pull: ExecutableType = async (task: TaskEntity): Promise<true | never> => {
  console.log('pull...')
  console.log('executable', task)

  try {
    await new Promise<void>((resolve) => {
      request(`https://codeload.github.com/${pipeline.repository}/zip/refs/heads/master`)
        .pipe(fs.createWriteStream(`${dir}/${cloneZip}`))
        .on('close', function () {
          resolve()
        })
    })

    // console.log(result)
  } catch (e) {
    // console.error(e)
    console.log('message', e.message)
    console.log('clone failed')
    throw e
  }

  unzip()

  return Promise.resolve(true)
}
