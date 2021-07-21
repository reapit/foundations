import * as service from './../../services/pipeline'
import { resolveDeveloperId } from './../../utils'
import { Request, Response, RequestHandler } from 'express'

/**
 * Return pagination response for signed in user
 */
export const pipelinePaginate: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
  const developerId = await resolveDeveloperId(request.headers, response)

  const page = request.query.page ? Number(request.query.page) : 0

  const result = await service.paginatePipelines(developerId, page)

  response.setHeader('Access-Control-Allow-Origin', '*')
  response.send(result)

  return response
}
