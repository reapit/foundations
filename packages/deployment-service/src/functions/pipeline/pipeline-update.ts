import { PipelineDto } from './../../dto'
import * as service from './../../services/pipeline'
import { validate } from 'class-validator'
import { ownership, resolveDeveloperId } from './../../utils'
import { plainToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { HttpStatusCode } from '@homeservenow/serverless-aws-handler'

/**
 * Update a given pipeline
 */
export const pipelineUpdate = async (request: Request, response: Response): Promise<Response> => {
  const developerId = await resolveDeveloperId(request.headers)
  const pipelineId = request.params.pipelineId

  // TODO should this be body.toApiKey
  const pipeline = await service.findPipelineById(pipelineId)

  if (!pipeline) {
    response.status(HttpStatusCode.NOT_FOUND)
    return response
  }

  await ownership(pipeline.developerId, developerId)

  const body = await validator(request.body, response)

  const updatedPipeline = await service.updatePipelineEntity(pipeline, body)

  response.status(HttpStatusCode.OK)
  response.send(updatedPipeline)
  response.setHeader('Access-Control-Allow-Origin', '*')

  return response
}

const validator = async (payload: any, response: Response): Promise<PipelineDto> => {
  const dto = plainToClass(PipelineDto, payload)
  const errors = await validate(dto)

  if (errors.length >= 1) {
    response.status(HttpStatusCode.BAD_REQUEST)
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.send(errors)

    throw new Error('validation errors')
  }

  return dto
}
