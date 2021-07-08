import { httpHandler } from '@homeservenow/serverless-aws-handler'
import { PipelineEntity } from './../../entities'
import * as service from './../../services/pipeline'
import { resolveDeveloperId } from './../../utils'
import { Pagination } from 'nestjs-typeorm-paginate'

/**
 * Return pagination response for signed in user
 */
export const pipelinePaginate = httpHandler({
  defaultOutputHeaders: {
    'Access-Control-Allow-Origin': '*',
  },
  handler: async ({ event }): Promise<Pagination<PipelineEntity>> => {
    const developerId = await resolveDeveloperId(event)

    const response = await service.paginatePipelines(
      developerId,
      event?.queryStringParameters?.page ? Number(event?.queryStringParameters?.page) : undefined,
    )

    const pagination: Pagination<PipelineEntity> = {
      items: [],
      meta: response[1],
    }

    for await (const apiKey of response[0]) {
      pagination.items.push(apiKey)
    }

    return pagination
  },
})
