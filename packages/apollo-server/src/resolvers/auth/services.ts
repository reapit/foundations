import { LoginParams } from '@reapit/cognito-auth'
import { ServerContext } from '../../app'
import logger from '../../logger'
import { callLoginAPI } from './api'

export const login = (args: LoginParams, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('login', { traceId, args })
  const contact = callLoginAPI(args, context)
  return contact
}

const authServices = {
  login,
}

export default authServices
