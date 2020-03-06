import contactServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../app'
import {
  GetContactByIdArgs,
  CreateContactArgs,
  GetContactsArgs,
  UpdateContactArgs,
  QueryGetContactByIdReturn,
  QueryGetContactsReturn,
  MutationCreateContactReturn,
  MutationUpdateContactReturn,
} from './contacts'

export const queryGetContactById = (
  _: any,
  args: GetContactByIdArgs,
  context: ServerContext,
): QueryGetContactByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetContactById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return contactServices.getContactById(args, context)
}

export const queryGetContacts = (_: any, args: GetContactsArgs, context: ServerContext): QueryGetContactsReturn => {
  const traceId = context.traceId
  logger.info('queryGetContacts', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return contactServices.getContacts(args, context)
}

export const mutationCreateContact = (
  _: any,
  args: CreateContactArgs,
  context: ServerContext,
): MutationCreateContactReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateContact', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return contactServices.createContact(args, context)
}

export const mutationUpdateContact = (
  _: any,
  args: UpdateContactArgs,
  context: ServerContext,
): MutationUpdateContactReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateContact', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return contactServices.updateContact(args, context)
}

export default {
  Query: {
    GetContactById: queryGetContactById,
    GetContacts: queryGetContacts,
  },
  Mutation: {
    CreateContact: mutationCreateContact,
    UpdateContact: mutationUpdateContact,
  },
}
