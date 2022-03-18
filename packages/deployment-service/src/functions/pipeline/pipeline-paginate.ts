import { httpHandler } from '@homeservenow/serverless-aws-handler'
import { PipelineEntity } from '../../entities/pipeline.entity'
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
    let appId: string | undefined

    if (event.pathParameters && event.pathParameters.pipelineId) {
      appId = event.pathParameters.pipelineId
    }

    return service.paginatePipelines(
      developerId,
      appId,
      event.queryStringParameters?.page ? Number(event.queryStringParameters?.page) : undefined,
    )
  },
})
