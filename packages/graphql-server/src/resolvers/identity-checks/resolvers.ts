import identityCheckServices from './services'
import logger from '../../logger'
import { resolverHandler, ServerContext } from '../../utils'
import {
  GetIdentityCheckByIdArgs,
  CreateIdentityCheckArgs,
  GetIdentityChecksArgs,
  UpdateIdentityCheckArgs,
  QueryGetIdentityCheckByIdReturn,
  QueryGetIdentityChecksReturn,
  MutationCreateIdentityCheckReturn,
  MutationUpdateIdentityCheckReturn,
} from './identity-checks'

export const queryGetIdentityCheckById = resolverHandler<GetIdentityCheckByIdArgs, QueryGetIdentityCheckByIdReturn>(
  (_: any, args: GetIdentityCheckByIdArgs, context: ServerContext): QueryGetIdentityCheckByIdReturn => {
    const traceId = context.traceId
    logger.info('queryGetIdentityCheckById', { traceId, args })
    return identityCheckServices.getIdentityCheckById(args, context)
  },
)

export const queryGetIdentityChecks = resolverHandler<GetIdentityChecksArgs, QueryGetIdentityChecksReturn>(
  (_: any, args: GetIdentityChecksArgs, context: ServerContext): QueryGetIdentityChecksReturn => {
    const traceId = context.traceId
    logger.info('queryGetIdentityChecks', { traceId, args })
    return identityCheckServices.getIdentityChecks(args, context)
  },
)

export const mutationCreateIdentityCheck = resolverHandler<CreateIdentityCheckArgs, MutationCreateIdentityCheckReturn>(
  (_: any, args: CreateIdentityCheckArgs, context: ServerContext): MutationCreateIdentityCheckReturn => {
    const traceId = context.traceId
    logger.info('mutationCreateIdentityCheck', { traceId, args })
    return identityCheckServices.createIdentityCheck(args, context)
  },
)

export const mutationUpdateIdentityCheck = resolverHandler<UpdateIdentityCheckArgs, MutationUpdateIdentityCheckReturn>(
  (_: any, args: UpdateIdentityCheckArgs, context: ServerContext): MutationUpdateIdentityCheckReturn => {
    const traceId = context.traceId
    logger.info('mutationUpdateIdentityCheck', { traceId, args })
    return identityCheckServices.updateIdentityCheck(args, context)
  },
)

export default {
  Query: {
    GetIdentityCheckById: queryGetIdentityCheckById,
    GetIdentityChecks: queryGetIdentityChecks,
  },
  Mutation: {
    CreateIdentityCheck: mutationCreateIdentityCheck,
    UpdateIdentityCheck: mutationUpdateIdentityCheck,
  },
}
