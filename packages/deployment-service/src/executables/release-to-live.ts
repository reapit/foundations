import AdmZip from 'adm-zip'
import rimraf from 'rimraf'
import { recurseDir } from '../utils'
import { sendToLiveS3 } from './deploy-to-live'
import fs from 'fs'

/**
 * Method for releasing built package
 */
export const releaseToLiveFromZip = async ({
  file,
  deploymentType,
  localLocation,
  projectLocation,
}: {
  file: Buffer
  deploymentType: 'release' | 'pipeline'
  localLocation: string
  projectLocation: string
}): Promise<void> => {
  if (!fs.existsSync(localLocation)) {
    fs.mkdirSync(localLocation, {
      recursive: true,
    })
  }

  const zip = new AdmZip(file)

  // Dumb arse package, upgraded minor with new property, without updating types about it...
  await new Promise<void>((resolve, reject) =>
    // @ts-ignore
    zip.extractAllToAsync(localLocation, true, true, (err) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      resolve()
    }),
  )
  // await the files to all exist. Some reason when extracting, some files don't exist for readdir
  await new Promise((resolve) => setTimeout(resolve, 6000))
  await recurseDir(
    {
      dir: localLocation,
      prefix: `${deploymentType}/${projectLocation}`,
      buildLocation: localLocation,
    },
    sendToLiveS3,
  )

  await new Promise<void>((resolve) =>
    rimraf(localLocation, () => {
      resolve()
    }),
  )
}
