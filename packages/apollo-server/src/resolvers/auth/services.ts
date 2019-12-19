import { LoginSession, LoginParams, loginUserSession } from '@reapit/cognito-auth'
import { ServerContext } from '../../app'
import logger from '../../logger'
import errors from '../../errors'

/*
 * API layer
 */

export const callLoginAPI = async (loginParams: LoginParams, context: ServerContext) => {
  const traceId = context.traceId
  try {
    const loginSession: Partial<LoginSession | undefined> = await loginUserSession(loginParams)
    return loginSession
  } catch (error) {
    logger.error('callLoginAPI', error)
    return errors.generateUserInputError(traceId)
  }
}

/*
 * Services layer
 */

export const login = (args: LoginParams, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('login', { traceId, args })
  const contact = callLoginAPI(args, context)
  return contact
}

export const authServices = {
  login,
}

export default authServices
