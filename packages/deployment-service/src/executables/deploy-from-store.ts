import { s3Client } from '../services'
import { PipelineEntity, PipelineRunnerEntity } from './../entities'
import fs from 'fs'
import { GetObjectOutput } from 'aws-sdk/clients/s3'
import AdmZip from 'adm-zip'
import path from 'path'
import rimraf from 'rimraf'

type SendToS3Params = {
  filePath: string
  prefix: string
  buildLocation: string
}

type SendToLiveS3Func = (params: SendToS3Params) => Promise<void | never>

const sendToLiveS3: SendToLiveS3Func = async ({
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

const getFromVersionS3 = async (location: string): Promise<GetObjectOutput | never> =>
  new Promise<GetObjectOutput>((resolve, reject) =>
    s3Client.getObject(
      {
        Bucket: process.env.DEPLOYMENT_VERSION_BUCKET_NAME as string,
        Key: `pipeline/${location}`,
      },
      (error, data) => {
        if (error) {
          console.error(error)
          reject(error)
        }

        resolve(data)
      },
    ),
  )

const deleteCurrentLiveVersion = (prefix: string): Promise<void | never> =>
  new Promise<void>((resolve, reject) =>
    s3Client.deleteObject(
      {
        Bucket: process.env.DEPLOYMENT_LIVE_BUCKET_NAME as string,
        Key: prefix,
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

const recurseDir = async (
  {
    dir,
    prefix,
    buildLocation,
  }: {
    dir: string
    prefix: string
    buildLocation: string
  },
  callback: SendToLiveS3Func,
) => {
  const entries = fs.readdirSync(dir)
  await Promise.all(
    entries.map((name) => {
      // [Promise<[Promise<[Promise<[] | void>] | void>] | void>] | void>... or Promise<void>
      const filePath = path.join(dir, name)
      const stat = fs.statSync(filePath)
      if (stat.isFile()) {
        return callback({ filePath, buildLocation, prefix })
      } else if (stat.isDirectory()) {
        return recurseDir(
          {
            dir: `pipeline/${filePath}`,
            prefix,
            buildLocation,
          },
          callback,
        )
      }
    }),
  )
}

export const deployFromStore = async ({
  pipeline,
  pipelineRunner,
}: {
  pipeline: PipelineEntity
  pipelineRunner: PipelineRunnerEntity
}): Promise<void> => {
  const storageLocation = `${pipeline.uniqueRepoName}/${pipelineRunner.id}.zip`

  console.log('fetching version from s3', storageLocation)
  const zip = await getFromVersionS3(storageLocation)

  if (!zip.Body) {
    throw new Error('Failed to find stored version')
  }

  const deploymentZipDir = `/tmp/deployment/${pipeline.uniqueRepoName}`

  if (!fs.existsSync(deploymentZipDir)) {
    console.log('making zip location', deploymentZipDir)
    fs.mkdirSync(deploymentZipDir, {
      recursive: true,
    })
  }

  const zipLocation = `${deploymentZipDir}/deployment.zip`

  await fs.promises.writeFile(zipLocation, zip.Body)
  const admZip = new AdmZip(zipLocation)

  console.log('extracting zip to loc', zipLocation, '=>', deploymentZipDir)
  await new Promise<void>((resolve, reject) =>
    admZip.extractAllToAsync(`${deploymentZipDir}/out`, true, (error) => {
      if (error) {
        reject(error)
      }
      resolve()
    }),
  )

  console.log('deleting current live deployment in s3')
  await deleteCurrentLiveVersion(pipeline.uniqueRepoName)

  console.log('recursively uploading files', fs.readdirSync(`${deploymentZipDir}/out`))
  await recurseDir(
    {
      dir: `${deploymentZipDir}/out`,
      prefix: pipeline.uniqueRepoName,
      buildLocation: `${deploymentZipDir}/out`,
    },
    sendToLiveS3,
  )

  await new Promise<void>((resolve) =>
    rimraf(deploymentZipDir, () => {
      resolve()
    }),
  )
}
