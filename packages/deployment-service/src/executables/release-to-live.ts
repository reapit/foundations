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
    console.log('making zip location', localLocation)
    fs.mkdirSync(localLocation, {
      recursive: true,
    })
  }

  const zip = new AdmZip(file)

  await new Promise<void>((resolve, reject) =>
    zip.extractAllToAsync(localLocation, true, (err) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      resolve()
    }),
  )

  await recurseDir(
    {
      dir: localLocation,
      prefix: `${deploymentType}/${projectLocation}`,
      buildLocation: localLocation,
      fileNameTransformer: (filePath: string) => filePath.replace('/build', ''),
    },
    sendToLiveS3,
  )

  await new Promise<void>((resolve) =>
    rimraf(localLocation, () => {
      resolve()
    }),
  )
}
