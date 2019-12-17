import logger from '../../logger'
import { ServerContext } from '../../app'

/*
 * API layer
 */
// TODO: will replace by fetch from API or database
const fetchContactById = async () => {
  logger.info('fetchContactById')
  return {}
}

/*
 * Services layer
 */

// TODO: will replace any when defined type for args
export const getContactById = async (args: any, context: ServerContext) => {
  const traceId = context.traceId
  const user = context.user
  logger.info('getContactById', { traceId, user, args })
  const contact = fetchContactById()
  return contact
}
