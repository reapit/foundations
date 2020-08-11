import OfferServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../index'
import {
  GetOfferByIdArgs,
  CreateOfferArgs,
  GetOffersArgs,
  UpdateOfferArgs,
  QueryGetOfferByIdReturn,
  QueryGetOffersReturn,
  MutationCreateOfferReturn,
  MutationUpdateOfferReturn,
} from './offers'

export const queryGetOfferById = (_: any, args: GetOfferByIdArgs, context: ServerContext): QueryGetOfferByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetOfferById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return OfferServices.getOfferById(args, context)
}

export const queryGetOffers = (_: any, args: GetOffersArgs, context: ServerContext): QueryGetOffersReturn => {
  const traceId = context.traceId
  logger.info('queryGetOffers', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return OfferServices.getOffers(args, context)
}

export const mutationCreateOffer = (
  _: any,
  args: CreateOfferArgs,
  context: ServerContext,
): MutationCreateOfferReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateOffer', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return OfferServices.createOffer(args, context)
}

export const mutationUpdateOffer = (
  _: any,
  args: UpdateOfferArgs,
  context: ServerContext,
): MutationUpdateOfferReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateOffer', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return OfferServices.updateOffer(args, context)
}

export default {
  Query: {
    GetOfferById: queryGetOfferById,
    GetOffers: queryGetOffers,
  },
  Mutation: {
    CreateOffer: mutationCreateOffer,
    UpdateOffer: mutationUpdateOffer,
  },
}
