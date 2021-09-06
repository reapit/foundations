import { s3Client } from '../services'
import fs from 'fs'

export type SendToS3Params = {
  filePath: string
  prefix: string
  buildLocation: string
}

export type SendToLiveS3Func = (params: SendToS3Params) => Promise<void | never>

export const sendToLiveS3: SendToLiveS3Func = async ({
  filePath,
  prefix,
  buildLocation,
}: SendToS3Params): Promise<void | never> =>
  new Promise<void>((resolve, reject) =>
    s3Client.upload(
      {
        Bucket: process.env.DEPLOYMENT_LIVE_BUCKET_NAME as string,
        Key: `${prefix}/${filePath.substring(buildLocation.length)}`,
        Body: fs.readFileSync(filePath),
        ACL: 'public-read',
      },
      (error) => {
        if (error) {
          console.error(error)
          reject(error)
        }

        resolve()
      },
    ),
  )
