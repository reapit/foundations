import { HttpStatusCode } from '@homeservenow/serverless-aws-handler'
import { RequestHandler, Request, Response, NextFunction } from 'express'

export const handlerWrapper = (func: RequestHandler) => (request: Request, response: Response, next: NextFunction) => {
  try {
    func(request, response, next)
  } catch (e) {
    console.error(e)
    response.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.send()
  }
}
