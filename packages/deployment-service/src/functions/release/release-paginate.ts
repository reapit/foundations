import { httpHandler } from '@homeservenow/serverless-aws-handler'
import { Pagination } from 'nestjs-typeorm-paginate'
import { resolveDeveloperId } from './../../utils'
import { ReleaseEntity } from './../../entities'
import * as service from './../../services/release'

export const releasePaginate = httpHandler<void, Pagination<ReleaseEntity>>({
  defaultOutputHeaders: {
    'Access-Control-Allow-Origin': '*',
  },
  handler: async ({ event }) => {
    const developerId = await resolveDeveloperId(event)

    const projectName = event.pathParameters?.projectName

    return service.paginateReleases(
      developerId,
      projectName,
      event?.queryStringParameters?.page ? Number(event?.queryStringParameters?.page) : undefined,
    )
  },
})
