import { resolveDeveloperId } from '../../utils'
import { HttpStatusCode } from '@homeservenow/serverless-aws-handler'
import { s3Client } from '../../services'
import { release } from './../../executables'
import * as services from './../../services/release'
import { RequestHandler, Request, Response } from 'express'

/**
 * Release a particular version
 */
export const deployVersion: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
  const developerId = await resolveDeveloperId(request.headers, response)
  const { projectName, version } = request.params

  if (!projectName || !version) {
    response.status(HttpStatusCode.BAD_REQUEST)
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.send('No project name or version sent')

    return response
  }

  const releaseEntity = await services.findByProjectNameAndVersion(projectName, version, developerId)

  if (!releaseEntity) {
    response.status(HttpStatusCode.NOT_FOUND)
    response.setHeader('Access-Control-Allow-Origin', '*')

    return response
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
    response.status(HttpStatusCode.BAD_REQUEST)
    response.setHeader('Access-Control-Allow-Origin', '*')

    return response
  }

  await release(file as Buffer)

  await services.resetDeploymentStatus(projectName, developerId)

  releaseEntity.currentlyDeployed = true
  const updatedRelease = await services.update(releaseEntity)

  response.send(updatedRelease)
  response.setHeader('Access-Control-Allow-Origin', '*')

  return response
}
