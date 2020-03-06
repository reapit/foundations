import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  GetNegotiatorByIdArgs,
  CreateNegotiatorArgs,
  UpdateNegotiatorArgs,
  GetNegotiatorsArgs,
  GetNegotiatorByIdReturn,
  GetNegotiatorsReturn,
  CreateNegotiatorReturn,
  UpdateNegotiatorReturn,
} from './negotiators'
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

export const getNegotiators = async (args: GetNegotiatorsArgs, context: ServerContext): GetNegotiatorsReturn => {
  const traceId = context.traceId
  logger.info('getNegotiators', { traceId, args })
  const negotiators = await callGetNegotiatorsAPI(args, context)
  return negotiators
}

export const createNegotiator = (args: CreateNegotiatorArgs, context: ServerContext): CreateNegotiatorReturn => {
  const traceId = context.traceId
  logger.info('createNegotiator', { traceId, args })
  const createResult = callCreateNegotiatorAPI(args, context)
  return createResult
}

export const updateNegotiator = (args: UpdateNegotiatorArgs, context: ServerContext): UpdateNegotiatorReturn => {
  const traceId = context.traceId
  logger.info('updateNegotiator', { traceId, args })
  const updateResult = callUpdateNegotiatorAPI({ ...args }, context)
  return updateResult
}

const negotiatorServices = {
  getNegotiatorById,
  getNegotiators,
  createNegotiator,
  updateNegotiator,
}

export default negotiatorServices
