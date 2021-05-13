import vendorServices from './services'
import logger from '../../logger'
import { resolverHandler, ServerContext } from '../../utils'
import {
  GetVendorByIdArgs,
  GetVendorsArgs,
  UpdateVendorArgs,
  QueryGetVendorByIdReturn,
  QueryGetVendorsReturn,
  MutationUpdateVendorReturn,
  GetVendorRelationshipsArgs,
  QueryGetVendorRelationshipsReturn,
  QueryGetVendorRelationshipByIdReturn,
  GetVendorRelationshipByIdArgs,
  CreateVendorRelationshipArgs,
  MutationCreateVendorRelationshipReturn,
  DeleteVendorRelationshipArgs,
  MutationDeleteVendorRelationshipReturn,
} from './vendors'

export const queryGetVendorById = resolverHandler<GetVendorByIdArgs, QueryGetVendorByIdReturn>(
  (_: any, args: GetVendorByIdArgs, context: ServerContext): QueryGetVendorByIdReturn => {
    const traceId = context.traceId
    logger.info('queryGetVendorById', { traceId, args })
    return vendorServices.getVendorById(args, context)
  },
)

export const queryGetVendors = resolverHandler<GetVendorsArgs, QueryGetVendorsReturn>(
  (_: any, args: GetVendorsArgs, context: ServerContext): QueryGetVendorsReturn => {
    const traceId = context.traceId
    logger.info('queryGetVendors', { traceId, args })
    return vendorServices.getVendors(args, context)
  },
)

export const mutationUpdateVendor = resolverHandler<UpdateVendorArgs, MutationUpdateVendorReturn>(
  (_: any, args: UpdateVendorArgs, context: ServerContext): MutationUpdateVendorReturn => {
    const traceId = context.traceId
    logger.info('mutationUpdateVendor', { traceId, args })
    return vendorServices.updateVendor(args, context)
  },
)

export const queryGetVendorRelationships = resolverHandler<
  GetVendorRelationshipsArgs,
  QueryGetVendorRelationshipsReturn
>(
  (_: any, args: GetVendorRelationshipsArgs, context: ServerContext): QueryGetVendorRelationshipsReturn => {
    const traceId = context.traceId
    logger.info('queryGetVendorRelationships', { traceId, args })
    return vendorServices.getVendorRelationships(args, context)
  },
)

export const queryGetVendorRelationshipById = resolverHandler<
  GetVendorRelationshipByIdArgs,
  QueryGetVendorRelationshipByIdReturn
>(
  (_: any, args: GetVendorRelationshipByIdArgs, context: ServerContext): QueryGetVendorRelationshipByIdReturn => {
    const traceId = context.traceId
    logger.info('queryGetVendorRelationshipById', { traceId, args })
    return vendorServices.getVendorRelationshipById(args, context)
  },
)

export const mutationCreateVendorRelationship = resolverHandler<
  CreateVendorRelationshipArgs,
  MutationCreateVendorRelationshipReturn
>(
  (_: any, args: CreateVendorRelationshipArgs, context: ServerContext): MutationCreateVendorRelationshipReturn => {
    const traceId = context.traceId
    logger.info('mutationCreateVendorRelationship', { traceId, args })
    return vendorServices.createVendorRelationship(args, context)
  },
)

export const mutationDeleteVendorRelationship = resolverHandler<
  DeleteVendorRelationshipArgs,
  MutationDeleteVendorRelationshipReturn
>(
  (_: any, args: DeleteVendorRelationshipArgs, context: ServerContext): MutationDeleteVendorRelationshipReturn => {
    const traceId = context.traceId
    logger.info('mutationDeleteVendorRelationship', { traceId, args })
    return vendorServices.deleteVendorRelationship(args, context)
  },
)

export default {
  Query: {
    GetVendorById: queryGetVendorById,
    GetVendors: queryGetVendors,
    GetVendorRelationships: queryGetVendorRelationships,
    GetVendorRelationshipById: queryGetVendorRelationshipById,
  },
  Mutation: {
    UpdateVendor: mutationUpdateVendor,
    CreateVendorRelationship: mutationCreateVendorRelationship,
    DeleteVendorRelationship: mutationDeleteVendorRelationship,
  },
}
