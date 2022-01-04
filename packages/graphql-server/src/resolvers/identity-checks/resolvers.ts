import identityCheckServices from './services'
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
    return identityCheckServices.getIdentityCheckById(args, context)
  },
)

export const queryGetIdentityChecks = resolverHandler<GetIdentityChecksArgs, QueryGetIdentityChecksReturn>(
  (_: any, args: GetIdentityChecksArgs, context: ServerContext): QueryGetIdentityChecksReturn => {
    return identityCheckServices.getIdentityChecks(args, context)
  },
)

export const mutationCreateIdentityCheck = resolverHandler<CreateIdentityCheckArgs, MutationCreateIdentityCheckReturn>(
  (_: any, args: CreateIdentityCheckArgs, context: ServerContext): MutationCreateIdentityCheckReturn => {
    return identityCheckServices.createIdentityCheck(args, context)
  },
)

export const mutationUpdateIdentityCheck = resolverHandler<UpdateIdentityCheckArgs, MutationUpdateIdentityCheckReturn>(
  (_: any, args: UpdateIdentityCheckArgs, context: ServerContext): MutationUpdateIdentityCheckReturn => {
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
