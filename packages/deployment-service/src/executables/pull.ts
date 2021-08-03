import { PipelineEntity, TaskEntity } from './../entities'
import { ExecutableType } from './executable'
import { exec } from 'child_process'

export const pull: ExecutableType = async (task: TaskEntity, pipeline: PipelineEntity): Promise<true | never> => {
  console.log('pull...')
  console.log('executable', task)

  try {
    const result = await exec(`git pull ${pipeline.repository} /tmp/project`, (error, stdout) => {
      if (error) {
        console.error(error)
        throw error
      }

      stdout && console.log(stdout.toString())
    })

    console.log('pull - result', result)

    // await new Promise<void>((resolve, reject) => {
    //   request(`https://codeload.github.com/${pipeline.repository}/${zipLocation}`)
    //     .pipe(fs.createWriteStream(`${dir}/${cloneZip}`))
    //     .on('close', () => {
    //       resolve()
    //     })
    //     .on('error', (error) => {
    //       reject(error)
    //     })
    // })

    // unzip()
  } catch (e) {
    console.log('message', e.message)
    console.log('clone failed')
    throw e
  }

  return Promise.resolve(true)
}
