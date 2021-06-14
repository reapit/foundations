import { resolveDeveloperId } from '@/utils'
import { httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import { s3Client } from '../../services'

/**
 * TODO
 *
 * [x] enable cli to upload code zip to S3 and add version files
 *
 * [ ] take zip from bucket and deploy with serverless
 * [x] list deployment versions (list file version from S3)
 * [ ] enable rollback deployments
 *
 */

const fileSeparator = '-'

const fileName = (developerId: string, project: string, version: string): string =>
  [developerId, project, version].join(fileSeparator) + '.zip'

/**
 * Deploy a new release
 */
export const deployRelease = httpHandler<any, void>({
  handler: async ({ body, event }) => {
    const developerId = await resolveDeveloperId(event)

    const s3FileName = fileName(
      developerId,
      event.pathParameters?.porject as string,
      event.pathParameters?.version as string,
    )

    await s3Client.putObject({
      Body: body,
      Bucket: process.env.DEPLOYMENT_BUCKET_NAME as string,
      Key: s3FileName,
    })

    // TODO deploy release
  },
})

/**
 * List releases
 */
export const releases = httpHandler<any, any[]>({
  handler: async ({ event }) => {
    const developerId = await resolveDeveloperId(event)

    const files = await new Promise<Object[]>((resolve, reject) =>
      s3Client.listObjectsV2(
        {
          Bucket: process.env.DEPLOYMENT_BUCKET_NAME as string,
          Delimiter: [developerId, event.pathParameters?.project as string].join(fileSeparator),
        },
        (err, data) => {
          if (typeof data !== 'undefined' && Array.isArray(data)) resolve(data.Contents as Object[])
          reject()
        },
      ),
    )

    return files
  },
})

/**
 * Release a particular version
 */
export const releaseVersion = httpHandler({
  handler: async ({ event }) => {
    const developerId = await resolveDeveloperId(event)

    const file = await new Promise<AWS.S3.Body>((resolve, reject) =>
      s3Client.getObject(
        {
          Bucket: process.env.DEPLOYMENT_BUCKET_NAME as string,
          Key: fileName(developerId, event.pathParameters?.project as string, event.pathParameters?.version as string),
        },
        (err, data) => {
          if (typeof data !== 'undefined' && Array.isArray(data)) resolve(data.Body as AWS.S3.Body)
          reject()
        },
      ),
    )

    if (!file) {
      throw new NotFoundException()
    }

    // TODO deploy version
  },
})
