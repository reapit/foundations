import negotiatorServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../app'
import {
  GetNegotiatorByIdArgs,
  CreateNegotiatorArgs,
  GetNegotiatorsArgs,
  UpdateNegotiatorArgs,
  QueryGetNegotiatorByIdReturn,
  QueryGetNegotiatorsReturn,
  MutationCreateNegotiatorReturn,
  MutationUpdateNegotiatorReturn,
} from './negotiators'

export const queryGetNegotiatorById = (
  _: any,
  args: GetNegotiatorByIdArgs,
  context: ServerContext,
): QueryGetNegotiatorByIdReturn => {
  const traceId = context.traceId
  logger.info('queryNegotiator', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return negotiatorServices.getNegotiatorById(args, context)
}

export const queryGetNegotiators = (
  _: any,
  args: GetNegotiatorsArgs,
  context: ServerContext,
): QueryGetNegotiatorsReturn => {
  const traceId = context.traceId
  logger.info('negotiators', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return negotiatorServices.getNegotiators(args, context)
}

export const mutationCreateNegotiator = (
  _: any,
  args: CreateNegotiatorArgs,
  context: ServerContext,
): MutationCreateNegotiatorReturn => {
  const traceId = context.traceId
  logger.info('createNegotiator', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return negotiatorServices.createNegotiator(args, context)
}

export const mutationUpdateNegotiator = (
  _: any,
  args: UpdateNegotiatorArgs,
  context: ServerContext,
): MutationUpdateNegotiatorReturn => {
  const traceId = context.traceId
  logger.info('updateNegotiator', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return negotiatorServices.updateNegotiator(args, context)
}

export default {
  Query: {
    GetNegotiatorById: queryGetNegotiatorById,
    GetNegotiators: queryGetNegotiators,
  },
  Mutation: {
    CreateNegotiator: mutationCreateNegotiator,
    UpdateNegotiator: mutationUpdateNegotiator,
  },
}
