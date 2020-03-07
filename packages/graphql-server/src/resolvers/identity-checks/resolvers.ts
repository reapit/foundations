import identityCheckServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../app'
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

export const queryGetIdentityCheckById = (
  _: any,
  args: GetIdentityCheckByIdArgs,
  context: ServerContext,
): QueryGetIdentityCheckByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetIdentityCheckById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return identityCheckServices.getIdentityCheckById(args, context)
}

export const queryGetIdentityChecks = (
  _: any,
  args: GetIdentityChecksArgs,
  context: ServerContext,
): QueryGetIdentityChecksReturn => {
  const traceId = context.traceId
  logger.info('queryGetIdentityChecks', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return identityCheckServices.getIdentityChecks(args, context)
}

export const mutationCreateIdentityCheck = (
  _: any,
  args: CreateIdentityCheckArgs,
  context: ServerContext,
): MutationCreateIdentityCheckReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateIdentityCheck', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return identityCheckServices.createIdentityCheck(args, context)
}

export const mutationUpdateIdentityCheck = (
  _: any,
  args: UpdateIdentityCheckArgs,
  context: ServerContext,
): MutationUpdateIdentityCheckReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateIdentityCheck', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return identityCheckServices.updateIdentityCheck(args, context)
}

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
