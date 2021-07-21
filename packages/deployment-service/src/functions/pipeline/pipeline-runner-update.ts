import { ownership, resolveDeveloperId } from './../../utils'
import { HttpStatusCode } from '@homeservenow/serverless-aws-handler'
import { DeploymentStatus } from '@reapit/foundations-ts-definitions'
import * as service from '../../services'
import { RequestHandler, Request, Response } from 'express'

/**
 * Update a pipelineRunner (cancel)
 */
// TODO refactor to delete method instead?
export const pipelineRunnerUpdate: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
  const developerId = await resolveDeveloperId(request.headers, response)
  const pipelineRunnerId = request.params.id

  const pipelineRunner = await service.findPipelineRunnerById(pipelineRunnerId)

  if (!pipelineRunner || typeof pipelineRunner.pipeline === 'undefined') {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.status(HttpStatusCode.NOT_FOUND)

    return response
  }

  await ownership(pipelineRunner.pipeline.id as string, developerId, response)

  const body = validator(request.body, response)

  if (pipelineRunner.buildStatus !== DeploymentStatus.RUNNING) {
    response.status(HttpStatusCode.OK)
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.send(pipelineRunner)

    return response
  }

  const updatedPipelineRunner = await service.updatePipelineRunnerEntity(pipelineRunner, body)

  response.send(updatedPipelineRunner)
  response.setHeader('Access-Control-Allow-Origin', '*')

  return response
}

const validator = (payload: any, response: Response) => {
  if (payload.buildSTatus && payload.buildSTatus !== DeploymentStatus.CANCELED) {
    response.status(HttpStatusCode.BAD_REQUEST)
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.send()

    throw new Error('Validation errors: Status can only be canceled')
  }

  return payload
}
