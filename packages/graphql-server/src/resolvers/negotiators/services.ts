import {
  NegotiatorModel,
  Negotiators,
  CreateNegotiatorModel,
  PagedResultNegotiatorModel_,
} from '@reapit/foundations-ts-definitions'
import logger from '../../logger'
import { ServerContext } from '../../app'
import { GetNegotiatorByIdArgs, UpdateNegotiatorArgs } from './negotiator'
import {
  callGetNegotiatorByIdAPI,
  callGetNegotiatorsAPI,
  callCreateNegotiatorAPI,
  callUpdateNegotiatorAPI,
} from './api'

export const getNegotiatorById = (args: GetNegotiatorByIdArgs, context: ServerContext): Promise<NegotiatorModel> => {
  const traceId = context.traceId
  logger.info('getNegotiatorById', { traceId, args })
  const negotiator = callGetNegotiatorByIdAPI(args, context)
  return negotiator
}

export const getNegotiators = (args: Negotiators, context: ServerContext): Promise<PagedResultNegotiatorModel_> => {
  const traceId = context.traceId
  logger.info('getNegotiators', { traceId, args })
  const negotiators = callGetNegotiatorsAPI(args, context)
  return negotiators
}

export const createNegotiator = (args: CreateNegotiatorModel, context: ServerContext): Promise<NegotiatorModel> => {
  const traceId = context.traceId
  logger.info('createNegotiator', { traceId, args })
  const negotiator = callCreateNegotiatorAPI(args, context)
  return negotiator
}

export const updateNegotiator = (args: UpdateNegotiatorArgs, context: ServerContext): Promise<NegotiatorModel> => {
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
