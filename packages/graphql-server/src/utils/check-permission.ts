import logger from '../logger'
import { ServerContext } from '../index'

export const checkPermission = (context: ServerContext) => {
  const traceId = context.traceId
  const isPermit = !!context.authorization
  logger.info('checkPermission', { traceId, isPermit })
  return isPermit
}
