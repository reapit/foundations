import { HttpStatusCode } from '@homeservenow/serverless-aws-handler'
import * as pipelineService from './../../services/pipeline'
import * as service from './../../services/pipeline-runner'
import { resolveDeveloperId } from './../../utils'
import { RequestHandler, Request, Response } from 'express'

/**
 * Return pagination response for signed in user
 */
export const pipelineRunnerPaginate: RequestHandler = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const developerId = await resolveDeveloperId(request.headers)
  const pipelineId = request.params.pipelineId

  const pipeline = await pipelineService.findPipelineById(pipelineId)

  if (!pipeline) {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.status(HttpStatusCode.NOT_FOUND)

    return response
  }

  if (pipeline.developerId !== developerId) {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.status(HttpStatusCode.FORBIDDEN)

    return response
  }

  const { page } = request.query

  const pagination = await service.paginatePipelineRunners(pipeline.id as string, page ? Number(page) : undefined)

  response.setHeader('Access-Control-Allow-Origin', '*')
  response.status(HttpStatusCode.OK)
  response.send(pagination)

  return response
}
