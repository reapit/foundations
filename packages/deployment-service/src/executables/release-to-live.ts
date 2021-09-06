import AdmZip from 'adm-zip'
import rimraf from 'rimraf'
import { recurseDir } from '../utils'
import { sendToLiveS3 } from './deploy-to-live'

/**
 * Method for releasing built package
 */
export const releaseToLive = async (file: Buffer, localLocation: string, prefix: 'release' | 'pipeline'): Promise<void> => {

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
      prefix,
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
