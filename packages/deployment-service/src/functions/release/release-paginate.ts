import { httpHandler } from '@homeservenow/serverless-aws-handler'
import { Pagination } from 'nestjs-typeorm-paginate'
import { resolveCreds } from './../../utils'
import { ReleaseEntity } from './../../entities'
import * as service from './../../services/release'

export const releasePaginate = httpHandler<void, Pagination<ReleaseEntity>>({
  defaultOutputHeaders: {
    'Access-Control-Allow-Origin': '*',
  },
  handler: async ({ event }) => {
    const { developerId } = await resolveCreds(event)

    const project = event.pathParameters?.project

    return service.paginateReleases(
      developerId,
      project,
      event?.queryStringParameters?.page ? Number(event?.queryStringParameters?.page) : undefined,
    )
  },
})
