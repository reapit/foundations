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
  logger.info('queryIdentityCheck', { traceId, args })
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
  logger.info('identityChecks', { traceId, args })
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
  logger.info('createIdentityCheck', { traceId, args })
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
  logger.info('updateIdentityCheck', { traceId, args })
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
