import vendorServices from './services'
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
    return vendorServices.getVendorById(args, context)
  },
)

export const queryGetVendors = resolverHandler<GetVendorsArgs, QueryGetVendorsReturn>(
  (_: any, args: GetVendorsArgs, context: ServerContext): QueryGetVendorsReturn => {
    return vendorServices.getVendors(args, context)
  },
)

export const mutationUpdateVendor = resolverHandler<UpdateVendorArgs, MutationUpdateVendorReturn>(
  (_: any, args: UpdateVendorArgs, context: ServerContext): MutationUpdateVendorReturn => {
    return vendorServices.updateVendor(args, context)
  },
)

export const queryGetVendorRelationships = resolverHandler<
  GetVendorRelationshipsArgs,
  QueryGetVendorRelationshipsReturn
>((_: any, args: GetVendorRelationshipsArgs, context: ServerContext): QueryGetVendorRelationshipsReturn => {
  return vendorServices.getVendorRelationships(args, context)
})

export const queryGetVendorRelationshipById = resolverHandler<
  GetVendorRelationshipByIdArgs,
  QueryGetVendorRelationshipByIdReturn
>((_: any, args: GetVendorRelationshipByIdArgs, context: ServerContext): QueryGetVendorRelationshipByIdReturn => {
  return vendorServices.getVendorRelationshipById(args, context)
})

export const mutationCreateVendorRelationship = resolverHandler<
  CreateVendorRelationshipArgs,
  MutationCreateVendorRelationshipReturn
>((_: any, args: CreateVendorRelationshipArgs, context: ServerContext): MutationCreateVendorRelationshipReturn => {
  return vendorServices.createVendorRelationship(args, context)
})

export const mutationDeleteVendorRelationship = resolverHandler<
  DeleteVendorRelationshipArgs,
  MutationDeleteVendorRelationshipReturn
>((_: any, args: DeleteVendorRelationshipArgs, context: ServerContext): MutationDeleteVendorRelationshipReturn => {
  return vendorServices.deleteVendorRelationship(args, context)
})

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
