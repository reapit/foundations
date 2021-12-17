import landlordServices from './services'
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
    return landlordServices.getLandlordById(args, context)
  },
)

export const queryGetLandlords = resolverHandler<GetLandlordsArgs, QueryGetLandlordsReturn>(
  (_: any, args: GetLandlordsArgs, context: ServerContext): QueryGetLandlordsReturn => {
    return landlordServices.getLandlords(args, context)
  },
)

export const queryGetLandlordRelationshipById = resolverHandler<
  GetLandlordRelationshipByIdArgs,
  QueryGetLandlordRelationshipByIdReturn
>((_: any, args: GetLandlordRelationshipByIdArgs, context: ServerContext): QueryGetLandlordRelationshipByIdReturn => {
  return landlordServices.getLandlordRelationshipById(args, context)
})

export const queryGetLandlordRelationships = resolverHandler<
  GetLandlordRelationshipsArgs,
  QueryGetLandlordRelationshipsReturn
>((_: any, args: GetLandlordRelationshipsArgs, context: ServerContext): QueryGetLandlordRelationshipsReturn => {
  return landlordServices.getLandlordRelationships(args, context)
})

export const mutationCreateLandlord = resolverHandler<CreateLandlordArgs, MutationCreateLandlordReturn>(
  (_: any, args: CreateLandlordArgs, context: ServerContext): MutationCreateLandlordReturn => {
    return landlordServices.createLandlord(args, context)
  },
)

export const mutationCreateLandlordRelationship = resolverHandler<
  CreateLandlordRelationshipArgs,
  MutationCreateLandlordRelationshipReturn
>((_: any, args: CreateLandlordRelationshipArgs, context: ServerContext): MutationCreateLandlordRelationshipReturn => {
  return landlordServices.createLandlordRelationship(args, context)
})

export const mutationDeleteLandlordRelationship = resolverHandler<
  DeleteLandlordRelationshipArgs,
  MutationDeleteLandlordRelationshipReturn
>((_: any, args: DeleteLandlordRelationshipArgs, context: ServerContext): MutationDeleteLandlordRelationshipReturn => {
  return landlordServices.deleteLandlordRelationship(args, context)
})

export const mutationUpdateLandlord = resolverHandler<UpdateLandlordArgs, MutationUpdateLandlordReturn>(
  (_: any, args: UpdateLandlordArgs, context: ServerContext): MutationUpdateLandlordReturn => {
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
