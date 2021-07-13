import { TaskEntity } from "src/entities"
import { ExecutableType } from "./executable"
import { execSync } from 'child_process'
import { resolve } from 'path'

const cloneDir = 'project'
const dir = resolve('/tmp', cloneDir)
const cloneZip = 'resource.zip'

export const install: ExecutableType = async (task: TaskEntity): Promise<true | never> => {
  console.log('installing...')
  console.log('executable', task)

  const projectDirName = resolve(dir, `${task.pipelineRunner.pipeline.repository.split('/').pop()}-master`)

  try {
    // TODO optional yarn usage
    const yarn = execSync('npm i', {
      cwd: projectDirName,
    })
    yarn && console.log('yarn', yarn.toString())
  } catch (e) {
    console.log('yarn errors', e)
    console.log(e.output.toString())
    throw e
  }

  return Promise.resolve(true)
}
