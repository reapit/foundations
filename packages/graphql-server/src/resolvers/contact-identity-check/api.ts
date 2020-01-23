import { fetcher } from '@reapit/elements'
import { CreateContactIdentityCheckArgs } from './contact-identity-check'
import logger from '../../logger'
import { ServerContext } from '../../app'
import errors from '../../errors'

export const REAPIT_API_BASE_URL = 'https://dev.platform.reapit.net'

export const URLS = {
  contacts: '/contacts',
  identityChecks: '/identitychecks',
}

export const callCreateIdentityCheckAPI = async (args: CreateContactIdentityCheckArgs, context: ServerContext) => {
  const traceId = context.traceId
  try {
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
    return createResponse
  } catch (error) {
    logger.error('callCreateIdentityCheckAPI', { traceId, error })
    return errors.generateUserInputError(traceId)
  }
}
