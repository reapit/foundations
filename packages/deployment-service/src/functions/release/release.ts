import { resolveDeveloperId } from '../../utils'
import { s3Client } from '../../services'
import { release } from './../../executables'
import * as services from './../../services/release'
import { RequestHandler, Request, Response } from 'express'
import { HttpStatusCode } from '@homeservenow/serverless-aws-handler'

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
export const deployRelease: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
  const developerId = await resolveDeveloperId(request.headers, response)

  const { projectName, version } = request.params

  const s3FileName = fileName(developerId, projectName, version)

  const file = Buffer.from(request.body, 'base64')

  if (!file) {
    response.status(HttpStatusCode.BAD_REQUEST)
    response.setHeader('Access-Control-Allow-Origin', '*')

    return response
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
  await services.resetDeploymentStatus(projectName, developerId)

  const releaseEntity = await services.createRelease({
    projectName,
    version,
    developerId,
    currentlyDeployed: true,
    zipLocation: s3FileName,
  })

  response.status(HttpStatusCode.CREATED)
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.send(releaseEntity)

  return response
}
