import { resolveDeveloperId } from './../../utils'
import { BadRequestException, httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import { s3Client } from '../../services'
import AdmZip from 'adm-zip'
import { execSync } from 'child_process'
import { defaultOutputHeaders } from '../../constants'

/**
 * For separation of parameters. Currently {delpoymentId}/{project-name}/{version}.zip
 */
const fileSeparator = '/'

/**
 * Generates file name {delpoymentId}/{project-name}/{version}.zip
 */
const fileName = (developerId: string, project: string, version: string): string =>
  [developerId, project, version].join(fileSeparator) + '.zip'

/**
 * Method for releasing built package
 */
const release = async (file: Buffer): Promise<void> => {
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

/**
 * Deploy a new release
 */
export const deployRelease = httpHandler<any, void>({
  defaultOutputHeaders,
  handler: async ({ event, body }) => {
    const developerId = await resolveDeveloperId(event)

    const s3FileName = fileName(
      developerId,
      event.pathParameters?.project as string,
      event.pathParameters?.version as string,
    )

    const file = Buffer.from(body.file, 'base64')

    if (!file) {
      throw new BadRequestException('File not provided')
    }

    await new Promise<void>((resolve, reject) =>
      s3Client.putObject(
        {
          Body: file,
          Bucket: process.env.DEPLOYMENT_BUCKET_NAME as string,
          Key: s3FileName,
        },
        (error) => {
          if (error) {
            console.error(error)
            reject()
          }
          resolve()
        },
      ),
    )

    await release(file)
  },
})

/**
 * List releases
 */
export const deployReleases = httpHandler<any, string[]>({
  defaultOutputHeaders,
  handler: async ({ event }) => {
    const developerId = await resolveDeveloperId(event)

    const files = await new Promise<string[]>((resolve, reject) =>
      s3Client.listObjectsV2(
        {
          Bucket: process.env.DEPLOYMENT_BUCKET_NAME as string,
          Delimiter: fileSeparator,
          Prefix: `${[developerId, event.pathParameters?.project as string].join(fileSeparator)}/`,
        },
        (err, data) => {
          if (data) resolve(data.Contents?.map((file) => file.Key as string) || ([] as string[]))
          reject()
          console.error(err)
        },
      ),
    )

    return files
  },
})

/**
 * Release a particular version
 */
export const deployVersion = httpHandler({
  defaultOutputHeaders,
  handler: async ({ event }) => {
    const developerId = await resolveDeveloperId(event)

    const file = await new Promise<AWS.S3.Body>((resolve, reject) =>
      s3Client.getObject(
        {
          Bucket: process.env.DEPLOYMENT_BUCKET_NAME as string,
          Key: fileName(developerId, event.pathParameters?.project as string, event.pathParameters?.version as string),
        },
        (err, data) => {
          if (err) {
            console.error(err)
            reject()
          }
          resolve(data.Body as AWS.S3.Body)
        },
      ),
    )

    if (!file) {
      throw new NotFoundException()
    }

    await release(file as Buffer)
  },
})
