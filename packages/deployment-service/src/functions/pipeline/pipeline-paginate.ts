import { httpHandler } from '@homeservenow/serverless-aws-handler'
import { PipelineModel } from '@/models'
import * as service from '@/services/pipeline'
import { resolveDeveloperId } from './../../utils'

type Pagintation<T> = {
  items: T[]
  meta: {
    // count: number
    nextCursor: string
  }
}

/**
 * Return pagination response for signed in user
 */
export const pipelinePaginate = httpHandler({
  defaultOutputHeaders: {
    'Access-Control-Allow-Origin': '*',
  },
  handler: async ({ event }): Promise<Pagintation<PipelineModel>> => {
    const developerId = await resolveDeveloperId(event)

    const response = await service.batchGetPipelines(
      developerId,
      event?.queryStringParameters?.nextCursor ? { id: event?.queryStringParameters?.nextCursor } : undefined,
    )

    const pagination: Pagintation<PipelineModel> = {
      items: [],
      meta: response[1],
    }

    for await (const apiKey of response[0]) {
      pagination.items.push(apiKey)
    }

    return pagination
  },
})
