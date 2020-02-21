import {
  NegotiatorModel,
  Negotiators,
  CreateNegotiatorModel,
  PagedResultNegotiatorModel_,
} from '@reapit/foundations-ts-definitions'
import negotiatorServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../app'
import { GetNegotiatorByIdArgs, UpdateNegotiatorArgs } from './negotiator'

export const queryNegotiatorById = (
  _: any,
  args: GetNegotiatorByIdArgs,
  context: ServerContext,
): Promise<NegotiatorModel> => {
  const traceId = context.traceId
  logger.info('queryNegotiator', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId) as any
  }
  return negotiatorServices.getNegotiatorById(args, context)
}

export const queryNegotiators = (
  _: any,
  args: Negotiators,
  context: ServerContext,
): Promise<PagedResultNegotiatorModel_> => {
  const traceId = context.traceId
  logger.info('queryNegotiators', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId) as any
  }
  return negotiatorServices.getNegotiators(args, context)
}

export const createNegotiator = (
  _: any,
  args: CreateNegotiatorModel,
  context: ServerContext,
): Promise<NegotiatorModel> => {
  const traceId = context.traceId
  logger.info('createNegotiator', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId) as any
  }
  return negotiatorServices.createNegotiator(args, context) as any
}

export const updateNegotiator = (
  _: any,
  args: UpdateNegotiatorArgs,
  context: ServerContext,
): Promise<NegotiatorModel> => {
  const traceId = context.traceId
  logger.info('updateNegotiator', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId) as any
  }
  return negotiatorServices.updateNegotiator(args, context)
}
