import { CreateContactIdentityCheckArgs } from './contact-identity-check'
import logger from '../../logger'
import { ServerContext } from '../../app'
import { callCreateIdentityCheckAPI } from './api'

export const createContactIdentityCheck = (args: CreateContactIdentityCheckArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('createContactIdentityCheck', { traceId, args })
  const contactIdentityCheck = callCreateIdentityCheckAPI(args, context)
  return contactIdentityCheck
}

const contactIdentityCheckServices = {
  createContactIdentityCheck,
}

export default contactIdentityCheckServices
