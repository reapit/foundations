import contactServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../app'
import { GetContactByIdArgs, CreateContactArgs, GetContactsArgs, UpdateContactArgs } from './contact'

export const queryContact = (_: any, args: GetContactByIdArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('queryContact', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return contactServices.getContactById(args, context)
}

export const queryContacts = (_: any, args: GetContactsArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('contacts', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return contactServices.getContacts(args, context)
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

export const updateContact = (_: any, args: UpdateContactArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('updateContact', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return contactServices.updateContact(args, context)
}
