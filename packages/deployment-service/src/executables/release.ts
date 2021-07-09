import AdmZip from 'adm-zip'
import { execSync } from 'child_process'

/**
 * Method for releasing built package
 */
export const release = async (file: Buffer): Promise<void> => {
  const tmpDir = '/tmp/project'

  const zip = new AdmZip(file)

  await new Promise<void>((resolve, reject) =>
    zip.extractAllToAsync(tmpDir, true, (err) => {
      if (err) {
        console.log('error happened init')
        console.error(err)
        reject(err)
      }
      resolve()
    }),
  )
  try {
    const yarn = await execSync('/opt/homebrew/bin/yarn', {
      maxBuffer: 1024 * 10000,
      cwd: tmpDir,
    })

    console.error('yarn', yarn.toString())
  } catch (e) {
    console.log(e.output.toString())
    console.error(e)
  }

  try {
    const serverless = await execSync('npx serverless deploy', {
      maxBuffer: 1024 * 10000,
      cwd: tmpDir,
    })

    console.log('serverless', serverless.toString())
  } catch (e) {
    console.error(e)
    console.log(e.output.toString())
  }
}
