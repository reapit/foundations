import { httpHandler } from '@homeservenow/serverless-aws-handler'
import { Pagination } from 'nestjs-typeorm-paginate'
import { resolveDeveloperId } from './../../utils'
import * as service from './../../services/release'

export const projectPaginate = httpHandler<void, Pagination<string>>({
  defaultOutputHeaders: {
    'Access-Control-Allow-Origin': '*',
  },
  handler: async ({ event }) => {
    const developerId = await resolveDeveloperId(event)

    return service.paginateProjects(
      developerId,
      event?.queryStringParameters?.page ? Number(event?.queryStringParameters?.page) : undefined,
    )
  },
})
