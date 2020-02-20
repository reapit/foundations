import negotiatorServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../app'
import { GetNegotiatorByIdArgs, GetNegotiatorsArgs, CreateNegotiatorArgs, UpdateNegotiatorArgs } from './negotiator'

export const queryNegotiator = (_: any, args: GetNegotiatorByIdArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('queryNegotiator', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return negotiatorServices.getNegotiatorById(args, context)
}

export const queryNegotiators = (_: any, args: GetNegotiatorsArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('queryNegotiators', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return negotiatorServices.getNegotiators(args, context)
}

export const createNegotiator = (_: any, args: CreateNegotiatorArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('createNegotiator', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return negotiatorServices.createNegotiator(args, context)
}

export const updateNegotiator = (_: any, args: UpdateNegotiatorArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('updateNegotiator', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return negotiatorServices.updateNegotiator(args, context)
}
