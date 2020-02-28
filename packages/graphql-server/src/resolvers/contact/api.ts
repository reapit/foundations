import { fetcher, setQueryParams } from '@reapit/elements'
import logger from '../../logger'
import { ServerContext } from '../../app'
import { GetContactByIdArgs, CreateContactArgs, GetContactsArgs } from './contact'
import errors from '../../errors'
import { API_VERSION } from '../../constants/api'

export const REAPIT_API_BASE_URL = 'https://dev.platform.reapit.net'
export const CONTACTS_PER_PAGE = 10
export const URLS = {
  contacts: '/contacts',
  identityChecks: '/identitychecks',
}

export const callGetContactByIdAPI = async (args: GetContactByIdArgs, context: ServerContext) => {
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
        'api-version': API_VERSION,
      },
    })
    return getResponse
  } catch (error) {
    logger.error('callGetContactByIdAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callGetContactsAPI = async (args: GetContactsArgs, context: ServerContext) => {
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
        'api-version': API_VERSION,
      },
    })
    return response
  } catch (error) {
    logger.error('callGetContactsAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

// TODO: will call create contact API
export const callCreateContactAPI = async (contact: CreateContactArgs) => {
  logger.info('createContact', { contact })
  return {}
}
