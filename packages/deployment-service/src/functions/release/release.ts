import { resolveCreds } from '../../utils'
import { BadRequestException, httpHandler } from '@homeservenow/serverless-aws-handler'
import { s3Client } from '../../services'
import { releaseToLive } from './../../executables'
import { defaultOutputHeaders } from '../../constants'
import * as services from './../../services/release'
import { ReleaseEntity } from './../../entities'

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
 * Deploy a new release
 */
export const deployRelease = httpHandler<any, ReleaseEntity>({
  defaultOutputHeaders,
  handler: async ({ event, body }) => {
    const { developerId } = await resolveCreds(event)

    const { project, version } = event.pathParameters as {project: string, version: string}

    const s3FileName = fileName(
      developerId,
      project,
      version,
    )

    const file = Buffer.from(body.file, 'base64')

    if (!file) {
      throw new BadRequestException('File not provided')
    }

    await new Promise<void>((resolve, reject) =>
      s3Client.putObject(
        {
          Body: file,
          Bucket: process.env.DEPLOYMENT_VERSION_BUCKET_NAME as string,
          Key: `release/${s3FileName}`,
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

    await releaseToLive(file, `/tmp/release/${project}/${version}`, 'release')
    await services.resetDeploymentStatus(event.pathParameters?.project as string, developerId)

    const releaseEntity = await services.createRelease({
      projectName: event.pathParameters?.project,
      version: event.pathParameters?.version,
      developerId,
      currentlyDeployed: true,
      zipLocation: s3FileName,
    })

    return releaseEntity
  },
})
