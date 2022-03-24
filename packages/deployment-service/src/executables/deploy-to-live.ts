import { assumedS3Client } from '../services'
import fs from 'fs'
import mime from 'mime-types'
import path from 'path'

export type DeployToS3Params = {
  filePath: string
  prefix: string
  buildLocation: string
  fileNameTransformer?: (string) => string
}

export type DeployToLiveS3Func = (params: DeployToS3Params) => Promise<void | never>

export const deployToLiveS3: DeployToLiveS3Func = async ({
  filePath,
  prefix,
  buildLocation,
  fileNameTransformer,
}: DeployToS3Params): Promise<void | never> => {
  const key = fileNameTransformer
    ? fileNameTransformer(filePath.substring(buildLocation.length))
    : filePath.substring(buildLocation.length)

  const s3Client = await assumedS3Client()

  console.log('got assumed client')

  return new Promise<void>((resolve, reject) =>
    s3Client.upload(
      {
        Bucket: process.env.DEPLOYMENT_LIVE_BUCKET_NAME as string,
        Key: `${prefix}/${key
          .split('/')
          .filter((part) => part !== '')
          .join('/')}`,
        Body: fs.readFileSync(filePath),
        ACL: 'public-read',
        ContentType: String(mime.lookup(path.extname(filePath))),
        Metadata: {
          ['Content-Type']: String(mime.lookup(path.extname(filePath))),
        },
      },
      (error) => {
        if (error) {
          console.error(error)
          return reject(error)
        }

        resolve()
      },
    ),
  )
}
