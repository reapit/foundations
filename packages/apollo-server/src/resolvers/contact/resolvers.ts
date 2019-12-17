import { contactServices } from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../app'
import { GetContactByIdArgs, CreateContactArgs } from './contact'

export const queryContact = (_: any, args: GetContactByIdArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('queryContact', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return contactServices.getContactById(args, context)
}

export const createContact = (_: any, args: CreateContactArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('createContact', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return contactServices.createContact(args, context)
}
