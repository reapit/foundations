import { fetcher } from '@reapit/elements'
import { CreateContactIdentityCheckArgs } from './contact-identity-check'
import logger from '../../logger'
import { ServerContext } from '../../app'
import errors from '../../errors'

/*
 * API layer
 */
export const REAPIT_API_BASE_URL = 'https://dev.platform.reapit.net'

export const URLS = {
  contacts: '/contacts',
  identityChecks: '/identitychecks',
}

export const callCreateIdentityCheckAPI = async (args: CreateContactIdentityCheckArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('callCreateIdentityCheckAPI', { traceId, args })
  const headers = {
    Authorization: context.authorization,
    'Content-Type': 'application/json',
  }
  const createResponse = await fetcher({
    url: `${URLS.contacts}/${args.contactId}${URLS.identityChecks}`,
    api: REAPIT_API_BASE_URL,
    method: 'POST',
    headers,
    body: args,
  })
  if (createResponse.status !== 200) {
    const error = createResponse.description
    logger.error('callCreateIdentityCheckAPI', { traceId, error })
    throw new Error(error)
  }
  return createResponse
}

/*
 * Services layer
 */

export const createContactIdentityCheck = (args: CreateContactIdentityCheckArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('createContactIdentityCheck', { traceId, args })
  try {
    const contactIdentityCheck = callCreateIdentityCheckAPI(args, context)
    return contactIdentityCheck
  } catch (error) {
    return errors.generateUserInputError(traceId)
  }
}

export const contactIdentityCheckServices = {
  createContactIdentityCheck,
}

export default contactIdentityCheckServices
