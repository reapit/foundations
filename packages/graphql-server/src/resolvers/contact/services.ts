import logger from '../../logger'
import { ServerContext } from '../../app'
import { GetContactByIdArgs, CreateContactArgs, UpdateContactArgs, GetContactsArgs } from './contact'
import { callGetContactByIdAPI, callGetContactsAPI, callCreateContactAPI, callUpdateContactAPI } from './api'

export const REAPIT_API_BASE_URL = 'https://dev.platform.reapit.net'
export const CONTACTS_PER_PAGE = 10
export const URLS = {
  contacts: '/contacts',
  identityChecks: '/identitychecks',
}

export const getContactById = (args: GetContactByIdArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('getContactById', { traceId, args })
  const contact = callGetContactByIdAPI(args, context)
  return contact
}

export const getContacts = (args: GetContactsArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('getContacts', { traceId, args })
  const contact = callGetContactsAPI(args, context)
  return contact
}

export const createContact = (args: CreateContactArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('createContact', { traceId, args })
  const contact = callCreateContactAPI(args, context)
  return contact
}

export const updateContact = (args: UpdateContactArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('updateContact', { traceId, args })
  const contact = callUpdateContactAPI(args, context)
  return contact
}

const contactServices = {
  getContactById,
  getContacts,
  createContact,
  updateContact,
}

export default contactServices
