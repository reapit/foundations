import logger from '../../logger'
import { LoginParams } from '@reapit/cognito-auth'
import authServices from './services'
import { ServerContext } from '../../app'

export const login = (_: any, args: LoginParams, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('login', { traceId, args })
  return authServices.login(args, context)
}
