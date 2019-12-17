import logger from '../../logger'
import { ServerContext } from '../../app'
import { checkPermission } from '../../utils/check-permission'
import errors from '../../errors'
import contactIdentityCheckServices from '../contact-identity-check/services'
import { CreateContactIdentityCheckArgs } from './contact-identity-check'

export const createContactIdentityCheck = (_: any, args: CreateContactIdentityCheckArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('createContactIdentityCheck', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return contactIdentityCheckServices.createContactIdentityCheck(args, context)
}
