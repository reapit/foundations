import { PipelineEntity, TaskEntity } from './../entities'
import { ExecutableType } from './executable'
import fs from 'fs'
import request from 'request'
import AdmZip from 'adm-zip'
import { dir, cloneZip } from '../constants'

const unzip = () => {
  const zip = new AdmZip(`${dir}/${cloneZip}`)
  zip.extractAllTo(`${dir}`, true)
}

const zipLocation = 'zip/refs/heads/master'

export const pull: ExecutableType = async (task: TaskEntity, pipeline: PipelineEntity): Promise<true | never> => {
  console.log('pull...')
  console.log('executable', task)

  try {
    await new Promise<void>((resolve) => {
      request(`https://codeload.github.com/${pipeline.repository}/${zipLocation}`)
        .pipe(fs.createWriteStream(`${dir}/${cloneZip}`))
        .on('close', function () {
          resolve()
        })
    })

    unzip()

    // console.log(result)
  } catch (e) {
    // console.error(e)
    console.log('message', e.message)
    console.log('clone failed')
    throw e
  }

  return Promise.resolve(true)
}
