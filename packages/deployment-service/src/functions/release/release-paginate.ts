import { resolveDeveloperId } from './../../utils'
import * as service from './../../services/release'
import { Request, Response, RequestHandler } from 'express'

export const releasePaginate: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
  const developerId = await resolveDeveloperId(request.headers, response)

  const projectName = request.params.projectName

  const { page } = request.query

  const pagination = await service.paginateReleases(developerId, projectName, page ? Number(page) : undefined)

  response.setHeader('Access-Control-Allow-Origin', '*')
  response.send(pagination)

  return response
}
