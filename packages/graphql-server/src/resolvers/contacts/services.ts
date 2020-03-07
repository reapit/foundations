import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  GetContactByIdArgs,
  CreateContactArgs,
  UpdateContactArgs,
  GetContactsArgs,
  GetContactByIdReturn,
  GetContactsReturn,
  CreateContactReturn,
  UpdateContactReturn,
} from './contacts'
import { callGetContactByIdAPI, callGetContactsAPI, callCreateContactAPI, callUpdateContactAPI } from './api'

export const getContactById = (args: GetContactByIdArgs, context: ServerContext): GetContactByIdReturn => {
  const traceId = context.traceId
  logger.info('getContactById', { traceId, args })
  const contact = callGetContactByIdAPI(args, context)
  return contact
}

export const getContacts = (args: GetContactsArgs, context: ServerContext): GetContactsReturn => {
  const traceId = context.traceId
  logger.info('getContacts', { traceId, args })
  const contacts = callGetContactsAPI(args, context)
  return contacts
}

export const createContact = (args: CreateContactArgs, context: ServerContext): CreateContactReturn => {
  const traceId = context.traceId
  logger.info('createContact', { traceId, args })
  const createResult = callCreateContactAPI(args, context)
  return createResult
}

export const updateContact = (args: UpdateContactArgs, context: ServerContext): UpdateContactReturn => {
  const traceId = context.traceId
  logger.info('updateContact', { traceId, args })
  const updateResult = callUpdateContactAPI({ ...args }, context)
  return updateResult
}

const contactServices = {
  getContactById,
  getContacts,
  createContact,
  updateContact,
}

export default contactServices
