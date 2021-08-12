import { httpHandler, NotFoundException, HttpStatusCode } from '@homeservenow/serverless-aws-handler'
import * as service from './../../services/pipeline'
import { ownership, resolveCreds } from './../../utils'
import { defaultOutputHeaders } from './../../constants'

/**
 * Delete a pipeline
 */
export const pipelineDelete = httpHandler({
  defaultOutputHeaders,
  defaultStatusCode: HttpStatusCode.NO_CONTENT,
  handler: async ({ event }): Promise<void> => {
    const { developerId } = await resolveCreds(event)

    const pipeline = await service.findPipelineById(event.pathParameters?.pipelineId as string)

    if (!pipeline) {
      throw new NotFoundException()
    }

    await ownership(pipeline.developerId, developerId)

    await service.deletePipelineEntity(pipeline)
  },
})
