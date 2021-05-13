import landlordServices from './services'
import logger from '../../logger'
import { resolverHandler, ServerContext } from '../../utils'
import {
  GetLandlordByIdArgs,
  QueryGetLandlordByIdReturn,
  GetLandlordsArgs,
  QueryGetLandlordsReturn,
  GetLandlordRelationshipsArgs,
  QueryGetLandlordRelationshipsReturn,
  GetLandlordRelationshipByIdArgs,
  QueryGetLandlordRelationshipByIdReturn,
  CreateLandlordArgs,
  MutationCreateLandlordReturn,
  CreateLandlordRelationshipArgs,
  MutationCreateLandlordRelationshipReturn,
  UpdateLandlordArgs,
  MutationUpdateLandlordReturn,
  DeleteLandlordRelationshipArgs,
  MutationDeleteLandlordRelationshipReturn,
} from './landlords'

export const queryGetLandlordById = resolverHandler<GetLandlordByIdArgs, QueryGetLandlordByIdReturn>(
  (_: any, args: GetLandlordByIdArgs, context: ServerContext): QueryGetLandlordByIdReturn => {
    const traceId = context.traceId
    logger.info('queryGetLandlordById', { traceId, args })
    return landlordServices.getLandlordById(args, context)
  },
)

export const queryGetLandlords = resolverHandler<GetLandlordsArgs, QueryGetLandlordsReturn>(
  (_: any, args: GetLandlordsArgs, context: ServerContext): QueryGetLandlordsReturn => {
    const traceId = context.traceId
    logger.info('queryGetLandlords', { traceId, args })
    return landlordServices.getLandlords(args, context)
  },
)

export const queryGetLandlordRelationshipById = resolverHandler<
  GetLandlordRelationshipByIdArgs,
  QueryGetLandlordRelationshipByIdReturn
>(
  (_: any, args: GetLandlordRelationshipByIdArgs, context: ServerContext): QueryGetLandlordRelationshipByIdReturn => {
    const traceId = context.traceId
    logger.info('queryGetLandlordRelationshipById', { traceId, args })
    return landlordServices.getLandlordRelationshipById(args, context)
  },
)

export const queryGetLandlordRelationships = resolverHandler<
  GetLandlordRelationshipsArgs,
  QueryGetLandlordRelationshipsReturn
>(
  (_: any, args: GetLandlordRelationshipsArgs, context: ServerContext): QueryGetLandlordRelationshipsReturn => {
    const traceId = context.traceId
    logger.info('queryGetLandlordRelationships', { traceId, args })
    return landlordServices.getLandlordRelationships(args, context)
  },
)

export const mutationCreateLandlord = resolverHandler<CreateLandlordArgs, MutationCreateLandlordReturn>(
  (_: any, args: CreateLandlordArgs, context: ServerContext): MutationCreateLandlordReturn => {
    const traceId = context.traceId
    logger.info('mutationCreateLandlord', { traceId, args })
    return landlordServices.createLandlord(args, context)
  },
)

export const mutationCreateLandlordRelationship = resolverHandler<
  CreateLandlordRelationshipArgs,
  MutationCreateLandlordRelationshipReturn
>(
  (_: any, args: CreateLandlordRelationshipArgs, context: ServerContext): MutationCreateLandlordRelationshipReturn => {
    const traceId = context.traceId
    logger.info('mutationCreateLandlordRelationship', { traceId, args })
    return landlordServices.createLandlordRelationship(args, context)
  },
)

export const mutationDeleteLandlordRelationship = resolverHandler<
  DeleteLandlordRelationshipArgs,
  MutationDeleteLandlordRelationshipReturn
>(
  (_: any, args: DeleteLandlordRelationshipArgs, context: ServerContext): MutationDeleteLandlordRelationshipReturn => {
    const traceId = context.traceId
    logger.info('mutationDeleteLandlordRelationship', { traceId, args })
    return landlordServices.deleteLandlordRelationship(args, context)
  },
)

export const mutationUpdateLandlord = resolverHandler<UpdateLandlordArgs, MutationUpdateLandlordReturn>(
  (_: any, args: UpdateLandlordArgs, context: ServerContext): MutationUpdateLandlordReturn => {
    const traceId = context.traceId
    logger.info('mutationUpdateLandlord', { traceId, args })
    return landlordServices.updateLandlord(args, context)
  },
)

export default {
  Query: {
    GetLandlords: queryGetLandlords,
    GetLandlordById: queryGetLandlordById,
    GetLandlordRelationships: queryGetLandlordRelationships,
    GetLandlordRelationshipById: queryGetLandlordRelationshipById,
  },
  Mutation: {
    CreateLandlord: mutationCreateLandlord,
    CreateLandlordRelationship: mutationCreateLandlordRelationship,
    DeleteLandlordRelationship: mutationDeleteLandlordRelationship,
    UpdateLandlord: mutationUpdateLandlord,
  },
}
