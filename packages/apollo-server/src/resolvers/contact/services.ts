import 'isomorphic-fetch'
import { fetcher, setQueryParams } from '@reapit/elements'
import logger from '../../logger'
import { ServerContext } from '../../app'
import { GetContactByIdArgs, CreateContactArgs, GetContactsArgs } from './contact'
import errors from '../../errors'

export const REAPIT_API_BASE_URL = 'https://dev.platform.reapit.net'
export const CONTACTS_PER_PAGE = 10
export const URLS = {
  contacts: '/contacts',
  identityChecks: '/identitychecks',
}

/*
 * API layer
 */
const callGetContactByIdAPI = async (args: GetContactByIdArgs, context: ServerContext) => {
  const traceId = context.traceId
  try {
    logger.info('callGetContactByIdAPI', { traceId, args })
    const getResponse = await fetcher({
      url: `${URLS.contacts}/${args.id}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: {
        Authorization: context.authorization,
        'Content-Type': 'application/json',
      },
    })
    return getResponse
  } catch (error) {
    logger.error('callGetContactByIdAPI', error)
    return errors.generateUserInputError(traceId)
  }
}

const callGetContactsAPI = async (args: GetContactsArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('callGetContactsAPI', { args, traceId })
  try {
    const response = fetcher({
      url: `${URLS.contacts}/?${setQueryParams({ ...args, pageSize: CONTACTS_PER_PAGE })}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: {
        Authorization: context.authorization,
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    logger.error('callGetContactsAPI', error)
    return errors.generateUserInputError(traceId)
  }
}

// TODO: will call create contact API
const callCreateContactAPI = async (contact: CreateContactArgs) => {
  logger.info('createContact', { contact })
  return {}
}

/*
 * Services layer
 */

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
  const contact = callCreateContactAPI(args)
  return contact
}

export const contactServices = {
  getContactById,
  createContact,
  getContacts,
}

export default contactServices
