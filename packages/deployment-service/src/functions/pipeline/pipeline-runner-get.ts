import { ownership, resolveDeveloperId } from './../../utils'
import { HttpStatusCode } from '@homeservenow/serverless-aws-handler'
import * as service from '../../services'
import { RequestHandler, Request, Response } from 'express'

/**
 * Get a pipeline by id
 */
export const pipelineRunnerGet: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
  const pipelineRunnerId = request.params.pipelineRunnerId
  const developerId = await resolveDeveloperId(request.headers, response)

  const pipelineRunner = await service.findPipelineRunnerById(pipelineRunnerId)

  if (!pipelineRunner || typeof pipelineRunner.pipeline === 'undefined') {
    response.status(HttpStatusCode.NOT_FOUND)
    return response
  }

  await ownership(pipelineRunner.pipeline.id, developerId, response)

  response.status(HttpStatusCode.OK)
  response.send(pipelineRunner)
  response.setHeader('Access-Control-Allow-Origin', '*')

  return response
}
