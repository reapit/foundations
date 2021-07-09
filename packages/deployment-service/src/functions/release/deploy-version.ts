import { resolveDeveloperId } from '../../utils'
import { BadRequestException, httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import { s3Client } from '../../services'
import { release } from './../../executables'
import { defaultOutputHeaders } from '../../constants'
import * as services from './../../services/release'
import { ReleaseEntity } from './../../entities'

/**
 * Release a particular version
 */
export const deployVersion = httpHandler<void, ReleaseEntity>({
  defaultOutputHeaders,
  handler: async ({ event }) => {
    const developerId = await resolveDeveloperId(event)
    const projectName = event.pathParameters?.projectName
    const version = event.pathParameters?.version

    if (!projectName || !version) {
      throw new BadRequestException()
    }

    const releaseEntity = await services.findByProjectNameAndVersion(projectName, version, developerId)

    if (!releaseEntity) {
      throw new NotFoundException()
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

    await release(file as Buffer)

    await services.resetDeploymentStatus(projectName, developerId)

    releaseEntity.currentlyDeployed = true
    return services.update(releaseEntity)
  },
})
