import { httpHandler } from '@homeservenow/serverless-aws-handler'
import { PipelineEntity } from './../../entities'
import * as service from './../../services/pipeline'
import { resolveCreds } from './../../utils'
import { Pagination } from 'nestjs-typeorm-paginate'

/**
 * Return pagination response for signed in user
 */
export const pipelinePaginate = httpHandler({
  defaultOutputHeaders: {
    'Access-Control-Allow-Origin': '*',
  },
  handler: async ({ event }): Promise<Pagination<PipelineEntity>> => {
    const { developerId } = await resolveCreds(event)

    return service.paginatePipelines(
      developerId,
      event?.queryStringParameters?.page ? Number(event?.queryStringParameters?.page) : undefined,
    )
  },
})
