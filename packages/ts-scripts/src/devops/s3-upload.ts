import { AssumeRoleCommand, AssumeRoleCommandOutput, STSClient, STSClientConfig } from '@aws-sdk/client-sts'
import { randomUUID, createHash } from 'crypto'
import { HeadObjectCommand, PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3'
import fs from 'fs'
import path from 'path'

const stsCredentialsToCredentials = (
  stsCredentials?: AssumeRoleCommandOutput['Credentials'],
): STSClientConfig['credentials'] => {
  if (!stsCredentials) {
    throw new Error('not defined')
  }
  const { AccessKeyId, SecretAccessKey, SessionToken, Expiration } = stsCredentials
  if (!AccessKeyId || !SecretAccessKey) {
    throw new Error('AccessKeyId/SecretAccessKey not defined')
  }
  return {
    accessKeyId: AccessKeyId,
    secretAccessKey: SecretAccessKey,
    sessionToken: SessionToken,
    expiration: Expiration,
  }
}

export const getCredentials = async ({
  region,
  oidcRoleArn,
  bucketRole,
}: {
  region: string
  oidcRoleArn: string
  bucketRole: string
}) => {
  const oidcClient = new STSClient({ region })

  const oidcRoleAssumed = await oidcClient.send(
    new AssumeRoleCommand({
      RoleArn: oidcRoleArn,
      RoleSessionName: randomUUID(),
    }),
  )

  const bucketClient = new STSClient({
    region,
    credentials: stsCredentialsToCredentials(oidcRoleAssumed.Credentials),
  })
  const bucketRoleAssumed = await bucketClient.send(
    new AssumeRoleCommand({
      RoleArn: bucketRole,
      RoleSessionName: randomUUID(),
    }),
  )

  return stsCredentialsToCredentials(bucketRoleAssumed.Credentials)
}

const hashFile = (filePath: string) => {
  const hash = createHash('sha256')
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(hash)
      .on('finish', function () {
        resolve(hash.digest('hex'))
      })
      .on('error', reject)
  })
}

export const uploadFiles = async ({
  bucket,
  region,
  credentials,
  filePaths,
  folder,
}: {
  bucket: string
  region: string
  folder: string
  filePaths: { filePath: string; devopsKey: string }[]
  credentials: S3ClientConfig['credentials']
}) => {
  const client = new S3Client({
    region,
    credentials,
  })

  return await Promise.all(
    filePaths.map(async ({ filePath, devopsKey }) => {
      try {
        fs.statSync(path.resolve(filePath))
      } catch (e) {
        throw new Error(`[${devopsKey}] file not found ${path.resolve(filePath)}`)
      }
      const ext = path.extname(filePath)
      const sha = await hashFile(filePath)
      const objectKey = `${folder}/${devopsKey}.${sha}.${ext}`
      let exists
      try {
        await client.send(
          new HeadObjectCommand({
            Bucket: bucket,
            Key: objectKey,
          }),
        )
        exists = true
      } catch (e) {
        exists = false
      }
      if (!exists) {
        await client.send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: objectKey,
            Body: fs.createReadStream(path.resolve(filePath)),
          }),
        )
      }
      console.log(`[${devopsKey}] Uploaded ${filePath} to ${objectKey}`)
      return {
        filePath,
        objectKey,
        devopsKey,
      }
    }),
  )
}
