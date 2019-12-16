import logger from '../logger'
import { ServerContext } from '../app'

export const checkPermission = (context: ServerContext) => {
  logger.info('checkPermission', { context })
  return true
}
