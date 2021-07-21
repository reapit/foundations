import { HttpStatusCode } from '@homeservenow/serverless-aws-handler'
import { PipelineDto } from './../../dto'
import * as service from './../../services/pipeline'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { resolveDeveloperId } from '../../utils'
import { Request, Response, RequestHandler } from 'express'

/**
 * Create a deployment pipeline configuration
 */
export const pipelineCreate: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
  const developerId = await resolveDeveloperId(request.headers)

  const body = await validator(request.body, response)

  const dto = body
    ? plainToClass(PipelineDto, {
        ...body,
        developerId,
      })
    : new PipelineDto()

  const pipeline = await service.createPipelineEntity(dto)

  response.setHeader('Access-Control-Allow-Origin', '*')
  response.status(HttpStatusCode.CREATED)
  response.send(pipeline)

  return response
}

const validator = async (payload: any, response: Response): Promise<PipelineDto> => {
  const dto = plainToClass(PipelineDto, payload)

  const errors = await validate(dto)

  if (errors.length >= 1) {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.status(HttpStatusCode.BAD_REQUEST)
    response.send(errors)
    throw new Error('validation errors')
  }

  return dto
}
