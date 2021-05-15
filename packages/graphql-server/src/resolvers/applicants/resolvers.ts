import applicantServices from './services'
import logger from '../../logger'
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
    const traceId = context.traceId
    logger.info('queryGetApplicantById', { traceId, args })
    return applicantServices.getApplicantById(args, context)
  },
)

export const queryGetApplicants = resolverHandler<GetApplicantsArgs, QueryGetApplicantsReturn>(
  (_: any, args: GetApplicantsArgs, context: ServerContext): QueryGetApplicantsReturn => {
    const traceId = context.traceId
    logger.info('queryGetApplicants', { traceId, args })
    return applicantServices.getApplicants(args, context)
  },
)

export const mutationCreateApplicant = resolverHandler<CreateApplicantArgs, MutationCreateApplicantReturn>(
  (_: any, args: CreateApplicantArgs, context: ServerContext): MutationCreateApplicantReturn => {
    const traceId = context.traceId
    logger.info('mutationCreateApplicant', { traceId, args })
    return applicantServices.createApplicant(args, context)
  },
)

export const mutationUpdateApplicant = resolverHandler<UpdateApplicantArgs, MutationUpdateApplicantReturn>(
  (_: any, args: UpdateApplicantArgs, context: ServerContext): MutationUpdateApplicantReturn => {
    const traceId = context.traceId
    logger.info('mutationUpdateApplicant', { traceId, args })
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
    const traceId = context.traceId
    logger.info('queryGetApplicantRelationshipById', { traceId, args })
    return applicantServices.getApplicantRelationshipById(args, context)
  },
)

export const queryGetApplicantRelationships = resolverHandler<
  GetApplicantRelationshipsArgs,
  QueryGetApplicantRelationshipsByIdReturn
>(
  (_: any, args: GetApplicantRelationshipsArgs, context: ServerContext): QueryGetApplicantRelationshipsReturn => {
    const traceId = context.traceId
    logger.info('queryGetApplicantRelationships', { traceId, args })
    return applicantServices.getApplicantRelationships(args, context)
  },
)

export const mutationCreateApplicantRelationship = resolverHandler<
  CreateApplicantRelationshipArgs,
  MutationCreateApplicantRelationshipsReturn
>(
  (
    _: any,
    args: CreateApplicantRelationshipArgs,
    context: ServerContext,
  ): MutationCreateApplicantRelationshipsReturn => {
    const traceId = context.traceId
    logger.info('mutationCreateApplicantRelationship', { traceId, args })
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
    const traceId = context.traceId
    logger.info('mutationDeleteApplicantRelationship', { traceId, args })
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
