import { resolveCreds } from '../../utils'
import { BadRequestException, httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import { s3Client } from '../../services'
import { releaseToLive } from './../../executables'
import { defaultOutputHeaders } from '../../constants'
import * as services from './../../services/release'
import { ReleaseEntity } from './../../entities'

/**
 * Release a particular version
 */
export const deployVersion = httpHandler<void, ReleaseEntity>({
  defaultOutputHeaders,
  handler: async ({ event }) => {
    const { developerId } = await resolveCreds(event)
    const projectName = event.pathParameters?.projectName
    const version = event.pathParameters?.version

    if (!projectName || !version) {
      throw new BadRequestException()
    }

    const releaseEntity = await services.findByProjectNameAndVersion(projectName, version, developerId)

    if (!releaseEntity) {
      throw new NotFoundException(`version [${version}] did not previously exist`)
    }

    const file = await new Promise<AWS.S3.Body>((resolve, reject) =>
      s3Client.getObject(
        {
          Bucket: process.env.DEPLOYMENT_BUCKET_NAME as string,
          Key: releaseEntity?.zipLocation as string,
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

    await releaseToLive(file as Buffer, `/tmp/release/${projectName}/${version}`, 'release', projectName)

    await services.resetDeploymentStatus(projectName, developerId)

    releaseEntity.currentlyDeployed = true
    return services.update(releaseEntity)
  },
})
