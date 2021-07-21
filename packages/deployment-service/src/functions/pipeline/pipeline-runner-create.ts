import { ownership, resolveDeveloperId } from './../../utils'
import * as service from '../../services'
import { QueueNames } from './../../constants'
import { Response, Request, RequestHandler } from 'express'
import { HttpStatusCode } from '@homeservenow/serverless-aws-handler'

/**
 * Create a new pipeline runner for deployment
 *
 * Cancels all existing running pipelines
 */
export const pipelineRunnerCreate: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
  const pipelineId = request.params.pipelineId

  if (!pipelineId) {
    response.status(HttpStatusCode.NOT_FOUND)
    response.setHeader('Access-Control-Allow-Origin', '*')

    return response
  }

  const developerId = await resolveDeveloperId(request.headers, response)

  const pipeline = await service.findPipelineById(pipelineId)

  if (!pipeline) {
    response.status(HttpStatusCode.NOT_FOUND)
    response.setHeader('Access-Control-Allow-Origin', '*')

    return response
  }

  await ownership(pipeline.developerId, developerId, response)

  const pipelineRunner = await service.createPipelineRunnerEntity({
    pipeline,
  })

  await new Promise<void>((resolve, reject) =>
    service.sqs.sendMessage(
      {
        MessageBody: JSON.stringify(pipelineRunner),
        QueueUrl: QueueNames.TASK_POPULATION,
      },
      (error) => {
        if (error) {
          reject(error)
        }
        resolve()
      },
    ),
  )

  response.status(HttpStatusCode.CREATED)
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.send(pipelineRunner)

  return response
}
