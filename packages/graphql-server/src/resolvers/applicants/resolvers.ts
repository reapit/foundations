import applicantServices from './services'
import { ServerContext, resolverHandler } from '../../utils'
import {
  GetApplicantByIdArgs,
  CreateApplicantArgs,
  GetApplicantsArgs,
  UpdateApplicantArgs,
  QueryGetApplicantByIdReturn,
  QueryGetApplicantsReturn,
  MutationCreateApplicantReturn,
  MutationUpdateApplicantReturn,
  GetApplicantRelationshipsByIdArgs,
  QueryGetApplicantRelationshipsByIdReturn,
  GetApplicantRelationshipsArgs,
  QueryGetApplicantRelationshipsReturn,
  CreateApplicantRelationshipArgs,
  MutationCreateApplicantRelationshipsReturn,
  DeleteApplicantRelationshipArgs,
  MutationDeleteApplicantRelationshipReturn,
} from './applicants'

export const queryGetApplicantById = resolverHandler<GetApplicantByIdArgs, QueryGetApplicantByIdReturn>(
  (_: any, args: GetApplicantByIdArgs, context: ServerContext): QueryGetApplicantByIdReturn => {
    return applicantServices.getApplicantById(args, context)
  },
)

export const queryGetApplicants = resolverHandler<GetApplicantsArgs, QueryGetApplicantsReturn>(
  (_: any, args: GetApplicantsArgs, context: ServerContext): QueryGetApplicantsReturn => {
    return applicantServices.getApplicants(args, context)
  },
)

export const mutationCreateApplicant = resolverHandler<CreateApplicantArgs, MutationCreateApplicantReturn>(
  (_: any, args: CreateApplicantArgs, context: ServerContext): MutationCreateApplicantReturn => {
    return applicantServices.createApplicant(args, context)
  },
)

export const mutationUpdateApplicant = resolverHandler<UpdateApplicantArgs, MutationUpdateApplicantReturn>(
  (_: any, args: UpdateApplicantArgs, context: ServerContext): MutationUpdateApplicantReturn => {
    return applicantServices.updateApplicant(args, context)
  },
)

export const queryGetApplicantRelationshipById = resolverHandler<
  GetApplicantRelationshipsArgs,
  QueryGetApplicantRelationshipsByIdReturn
>(
  (
    _: any,
    args: GetApplicantRelationshipsByIdArgs,
    context: ServerContext,
  ): QueryGetApplicantRelationshipsByIdReturn => {
    return applicantServices.getApplicantRelationshipById(args, context)
  },
)

export const queryGetApplicantRelationships = resolverHandler<
  GetApplicantRelationshipsArgs,
  QueryGetApplicantRelationshipsByIdReturn
>((_: any, args: GetApplicantRelationshipsArgs, context: ServerContext): QueryGetApplicantRelationshipsReturn => {
  return applicantServices.getApplicantRelationships(args, context)
})

export const mutationCreateApplicantRelationship = resolverHandler<
  CreateApplicantRelationshipArgs,
  MutationCreateApplicantRelationshipsReturn
>(
  (
    _: any,
    args: CreateApplicantRelationshipArgs,
    context: ServerContext,
  ): MutationCreateApplicantRelationshipsReturn => {
    return applicantServices.createApplicantRelationship(args, context)
  },
)

export const mutationDeleteApplicantRelationship = resolverHandler<
  DeleteApplicantRelationshipArgs,
  MutationDeleteApplicantRelationshipReturn
>(
  (
    _: any,
    args: DeleteApplicantRelationshipArgs,
    context: ServerContext,
  ): MutationDeleteApplicantRelationshipReturn => {
    return applicantServices.deleteApplicantRelationship(args, context)
  },
)

export default {
  Query: {
    GetApplicantById: queryGetApplicantById,
    GetApplicants: queryGetApplicants,
    GetApplicantRelationshipById: queryGetApplicantRelationshipById,
    GetApplicantRelationships: queryGetApplicantRelationships,
  },
  Mutation: {
    CreateApplicant: mutationCreateApplicant,
    UpdateApplicant: mutationUpdateApplicant,
    CreateApplicantRelationship: mutationCreateApplicantRelationship,
    DeleteApplicantRelationship: mutationDeleteApplicantRelationship,
  },
}
