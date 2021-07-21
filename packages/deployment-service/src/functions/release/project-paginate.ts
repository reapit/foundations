import { resolveDeveloperId } from './../../utils'
import * as service from './../../services/release'
import { Request, Response, RequestHandler } from 'express'

export const projectPaginate: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
  const developerId = await resolveDeveloperId(request.headers, response)

  const { page } = request.query

  const pagination = await service.paginateProjects(developerId, page ? Number(page) : undefined)

  response.setHeader('Access-Control-Allow-Origin', '*')
  response.send(pagination)

  return response
}
