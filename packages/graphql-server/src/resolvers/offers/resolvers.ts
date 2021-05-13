import OfferServices from './services'
import logger from '../../logger'
import { resolverHandler, ServerContext } from '../../utils'
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

export const queryGetOfferById = resolverHandler<GetOfferByIdArgs, QueryGetOfferByIdReturn>((_: any, args: GetOfferByIdArgs, context: ServerContext): QueryGetOfferByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetOfferById', { traceId, args })
  return OfferServices.getOfferById(args, context)
})

export const queryGetOffers = resolverHandler<GetOffersArgs, QueryGetOffersReturn>((_: any, args: GetOffersArgs, context: ServerContext): QueryGetOffersReturn => {
  const traceId = context.traceId
  logger.info('queryGetOffers', { traceId, args })
  return OfferServices.getOffers(args, context)
})

export const mutationCreateOffer = resolverHandler<CreateOfferArgs, MutationCreateOfferReturn>((
  _: any,
  args: CreateOfferArgs,
  context: ServerContext,
): MutationCreateOfferReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateOffer', { traceId, args })
  return OfferServices.createOffer(args, context)
})

export const mutationUpdateOffer = resolverHandler<UpdateOfferArgs, MutationUpdateOfferReturn>((
  _: any,
  args: UpdateOfferArgs,
  context: ServerContext,
): MutationUpdateOfferReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateOffer', { traceId, args })
  return OfferServices.updateOffer(args, context)
})

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
