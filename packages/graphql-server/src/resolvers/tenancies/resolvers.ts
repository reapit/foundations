import tenancyServices from './services'
import logger from '../../logger'
import { resolverHandler, ServerContext } from '../../utils'
import {
  GetTenancyByIdArgs,
  QueryGetTenancyByIdReturn,
  GetTenanciesArgs,
  QueryGetTenanciesReturn,
  GetTenancyRelationshipsArgs,
  QueryGetTenancyRelationshipsReturn,
  GetTenancyChecksArgs,
  QueryGetTenancyChecksReturn,
  GetTenancyCheckByIdArgs,
  QueryGetTenancyCheckByIdReturn,
  CreateTenancyArgs,
  MutationCreateTenancyReturn,
  CreateTenancyCheckArgs,
  MutationCreateTenancyCheckReturn,
  DeleteTenancyCheckArgs,
  MutationDeleteTenancyCheckReturn,
  UpdateTenancyCheckArgs,
  MutationUpdateTenancyCheckReturn,
} from './tenancies'

export const queryGetTenancyById = resolverHandler<GetTenancyByIdArgs, QueryGetTenancyByIdReturn>(
  (_: any, args: GetTenancyByIdArgs, context: ServerContext): QueryGetTenancyByIdReturn => {
    const traceId = context.traceId
    logger.info('queryGetTenancyById', { traceId, args })
    return tenancyServices.getTenancyById(args, context)
  },
)

export const queryGetTenancies = resolverHandler<GetTenanciesArgs, QueryGetTenanciesReturn>(
  (_: any, args: GetTenanciesArgs, context: ServerContext): QueryGetTenanciesReturn => {
    const traceId = context.traceId
    logger.info('queryGetTenancies', { traceId, args })
    return tenancyServices.getTenancies(args, context)
  },
)

export const queryGetTenancyCheckById = resolverHandler<GetTenancyCheckByIdArgs, QueryGetTenancyCheckByIdReturn>(
  (_: any, args: GetTenancyCheckByIdArgs, context: ServerContext): QueryGetTenancyCheckByIdReturn => {
    const traceId = context.traceId
    logger.info('queryGetTenancyCheckById', { traceId, args })
    return tenancyServices.getTenancyCheckById(args, context)
  },
)

export const queryGetTenancyChecks = resolverHandler<GetTenancyChecksArgs, QueryGetTenancyChecksReturn>(
  (_: any, args: GetTenancyChecksArgs, context: ServerContext): QueryGetTenancyChecksReturn => {
    const traceId = context.traceId
    logger.info('queryGetTenancyChecks', { traceId, args })
    return tenancyServices.getTenancyChecks(args, context)
  },
)

export const queryGetTenancyRelationships = resolverHandler<
  GetTenancyRelationshipsArgs,
  QueryGetTenancyRelationshipsReturn
>(
  (_: any, args: GetTenancyRelationshipsArgs, context: ServerContext): QueryGetTenancyRelationshipsReturn => {
    const traceId = context.traceId
    logger.info('queryGetTenancyRelationships', { traceId, args })
    return tenancyServices.getTenancyRelationships(args, context)
  },
)

export const mutationCreateTenancy = resolverHandler<CreateTenancyArgs, MutationCreateTenancyReturn>(
  (_: any, args: CreateTenancyArgs, context: ServerContext): MutationCreateTenancyReturn => {
    const traceId = context.traceId
    logger.info('mutationCreateTenancy', { traceId, args })
    return tenancyServices.createTenancy(args, context)
  },
)

export const mutationCreateTenancyCheck = resolverHandler<CreateTenancyCheckArgs, MutationCreateTenancyReturn>(
  (_: any, args: CreateTenancyCheckArgs, context: ServerContext): MutationCreateTenancyCheckReturn => {
    const traceId = context.traceId
    logger.info('mutationCreateTenancyCheck', { traceId, args })
    return tenancyServices.createTenancyCheck(args, context)
  },
)

export const mutationDeleteTenancyCheck = resolverHandler<DeleteTenancyCheckArgs, MutationDeleteTenancyCheckReturn>(
  (_: any, args: DeleteTenancyCheckArgs, context: ServerContext): MutationDeleteTenancyCheckReturn => {
    const traceId = context.traceId
    logger.info('mutationDeleteTenancyCheck', { traceId, args })
    return tenancyServices.deleteTenancyCheck(args, context)
  },
)

export const mutationUpdateTenancyCheck = resolverHandler<UpdateTenancyCheckArgs, MutationUpdateTenancyCheckReturn>(
  (_: any, args: UpdateTenancyCheckArgs, context: ServerContext): MutationUpdateTenancyCheckReturn => {
    const traceId = context.traceId
    logger.info('mutationUpdateTenancyCheck', { traceId, args })
    return tenancyServices.updateTenancyCheck(args, context)
  },
)

export default {
  Query: {
    GetTenancies: queryGetTenancies,
    GetTenancyById: queryGetTenancyById,
    GetTenancyRelationships: queryGetTenancyRelationships,
    GetTenancyChecks: queryGetTenancyChecks,
    GetTenancyCheckById: queryGetTenancyCheckById,
  },
  Mutation: {
    CreateTenancy: mutationCreateTenancy,
    CreateTenancyCheck: mutationCreateTenancyCheck,
    DeleteTenancyCheck: mutationDeleteTenancyCheck,
    UpdateTenancyCheck: mutationUpdateTenancyCheck,
  },
}
