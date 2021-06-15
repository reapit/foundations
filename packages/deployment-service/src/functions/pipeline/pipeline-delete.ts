import { httpHandler, NotFoundException, HttpStatusCode } from '@homeservenow/serverless-aws-handler'
import * as service from '@/services/pipeline'
import { ownership, resolveDeveloperId } from '@/utils'
import { defaultOutputHeaders } from './../../constants'

/**
 * Delete a pipeline
 */
export const pipelineDelete = httpHandler({
  defaultOutputHeaders,
  defaultStatusCode: HttpStatusCode.NO_CONTENT,
  handler: async ({ event }): Promise<void> => {
    const developerId = await resolveDeveloperId(event)

    const pipeline = await service.findPipelineById(event.pathParameters?.id as string)

    if (!pipeline) {
      throw new NotFoundException()
    }

    await ownership(pipeline.developerId, developerId)

    await service.deletePipelineModel(pipeline)
  },
})
