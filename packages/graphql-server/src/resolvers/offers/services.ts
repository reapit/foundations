import logger from '../../logger'
import { ServerContext } from '../../index'
import {
  GetOfferByIdArgs,
  CreateOfferArgs,
  UpdateOfferArgs,
  GetOffersArgs,
  GetOfferByIdReturn,
  GetOffersReturn,
  CreateOfferReturn,
  UpdateOfferReturn,
} from './offers'
import { callGetOfferByIdAPI, callGetOffersAPI, callCreateOfferAPI, callUpdateOfferAPI } from './api'

export const getOfferById = (args: GetOfferByIdArgs, context: ServerContext): GetOfferByIdReturn => {
  const traceId = context.traceId
  logger.info('getOfferById', { traceId, args })
  const Offer = callGetOfferByIdAPI(args, context)
  return Offer
}

export const getOffers = (args: GetOffersArgs, context: ServerContext): GetOffersReturn => {
  const traceId = context.traceId
  logger.info('getOffers', { traceId, args })
  const Offers = callGetOffersAPI(args, context)
  return Offers
}

export const createOffer = (args: CreateOfferArgs, context: ServerContext): CreateOfferReturn => {
  const traceId = context.traceId
  logger.info('createOffer', { traceId, args })
  const createResult = callCreateOfferAPI(args, context)
  return createResult
}

export const updateOffer = (args: UpdateOfferArgs, context: ServerContext): UpdateOfferReturn => {
  const traceId = context.traceId
  logger.info('updateOffer', { traceId, args })
  const updateResult = callUpdateOfferAPI({ ...args }, context)
  return updateResult
}

const OfferServices = {
  getOfferById,
  getOffers,
  createOffer,
  updateOffer,
}

export default OfferServices
