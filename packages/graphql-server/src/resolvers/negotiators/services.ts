import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  GetNegotiatorByIdArgs,
  GetNegotiatorsArgs,
  CreateNegotiatorArgs,
  UpdateNegotiatorArgs,
  GetNegotiatorByIdReturn,
  GetNegotiatorsReturn,
  CreateNegotiatorReturn,
  UpdateNegotiatorReturn,
} from './negotiator'
import {
  callGetNegotiatorByIdAPI,
  callGetNegotiatorsAPI,
  callCreateNegotiatorAPI,
  callUpdateNegotiatorAPI,
} from './api'

export const getNegotiatorById = (args: GetNegotiatorByIdArgs, context: ServerContext): GetNegotiatorByIdReturn => {
  const traceId = context.traceId
  logger.info('getNegotiatorById', { traceId, args })
  const negotiator = callGetNegotiatorByIdAPI(args, context)
  return negotiator
}

export const getNegotiators = (args: GetNegotiatorsArgs, context: ServerContext): GetNegotiatorsReturn => {
  const traceId = context.traceId
  logger.info('getNegotiators', { traceId, args })
  const negotiators = callGetNegotiatorsAPI(args, context)
  return negotiators
}

export const createNegotiator = (args: CreateNegotiatorArgs, context: ServerContext): CreateNegotiatorReturn => {
  const traceId = context.traceId
  logger.info('createNegotiator', { traceId, args })
  const negotiator = callCreateNegotiatorAPI(args, context)
  return negotiator
}

export const updateNegotiator = (args: UpdateNegotiatorArgs, context: ServerContext): UpdateNegotiatorReturn => {
  const traceId = context.traceId
  logger.info('updateNegotiator', { traceId, args })
  const negotiator = callUpdateNegotiatorAPI(args, context)
  return negotiator
}

const negotiatorServices = {
  getNegotiatorById,
  getNegotiators,
  createNegotiator,
  updateNegotiator,
}

export default negotiatorServices
