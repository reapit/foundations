import * as service from './../../services/pipeline'
import { ownership, resolveDeveloperId } from './../../utils'
import { Request, Response, RequestHandler } from 'express'
import { HttpStatusCode } from '@homeservenow/serverless-aws-handler'

/**
 * Get a pipeline by id
 */
export const pipelineGet: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
  const developerId = await resolveDeveloperId(request.headers, response)

  const pipelineId = request.params.pipelineId

  const pipeline = await service.findPipelineById(pipelineId)

  if (!pipeline) {
    response.status(HttpStatusCode.NOT_FOUND)
    response.setHeader('Access-Control-Allow-Origin', '*')
    return response
  }

  await ownership(pipeline.developerId, developerId, response)

  response.setHeader('Access-Control-Allow-Origin', '*')
  response.send(pipeline)

  return response
}
