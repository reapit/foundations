import * as service from './../../services/pipeline'
import { ownership, resolveDeveloperId } from './../../utils'
import { Request, Response, RequestHandler } from 'express'
import { HttpStatusCode } from '@homeservenow/serverless-aws-handler'

/**
 * Delete a pipeline
 */
export const pipelineDelete: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
  const developerId = await resolveDeveloperId(request.headers)

  const pipelineId = request.params.pipelineId

  const pipeline = await service.findPipelineById(pipelineId as string)

  if (!pipeline) {
    response.status(HttpStatusCode.NOT_FOUND)
    response.setHeader('Access-Control-Allow-Origin', '*')
    return response
  }

  await ownership(pipeline.developerId, developerId)

  await service.deletePipelineEntity(pipeline)

  response.setHeader('Access-Control-Allow-Origin', '*')
  response.status(HttpStatusCode.NO_CONTENT)
  return response
}
