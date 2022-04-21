import { S3 } from 'aws-sdk'
import { getRoleCredentials } from './sts'

export const s3Client = new S3({
  region: process.env.REGION,
})

export const assumedS3Client = async () =>
  new S3({
    region: process.env.REGION,
    credentials: await getRoleCredentials(),
  })
