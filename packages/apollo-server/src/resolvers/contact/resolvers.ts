import { getContactById } from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../app'

// TODO: will replace any when defined type for args
export const queryContact = (parent: any, args: any, context: ServerContext) => {
  const traceId = context.traceId
  const user = context.user
  logger.info('queryContact', { traceId, user, parent })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return getContactById(args, context)
}
