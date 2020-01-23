import { LoginParams, LoginSession, loginUserSession } from '@reapit/cognito-auth'
import { ServerContext } from '../../app'
import logger from '../../logger'
import errors from '../../errors'

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
