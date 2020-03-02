import logger from '../../logger'
import { ServerContext } from '../../app'
import { checkPermission } from '../../utils/check-permission'
import errors from '../../errors'
import identityCheckServices from '../identity-check/services'
import {
  MutationUpdateIdentityCheckReturn,
  MutationCreateIdentityCheckReturn,
  QueryIdentityCheckReturn,
  QueryIdentityChecksReturn,
  GetIdentityCheckByIdArgs,
  GetIdentityChecksArgs,
  CreateIdentityCheckArgs,
  UpdateIdentityCheckArgs,
} from './identity-check'

export const queryIdentityChecks = (
  _: any,
  args: GetIdentityChecksArgs,
  context: ServerContext,
): QueryIdentityChecksReturn => {
  const traceId = context.traceId
  logger.info('queryIdentityChecks', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return identityCheckServices.getIdentityChecks(args, context)
}

export const queryIdentityCheckById = (
  _: any,
  args: GetIdentityCheckByIdArgs,
  context: ServerContext,
): QueryIdentityCheckReturn => {
  const traceId = context.traceId
  logger.info('queryIdentityCheck', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return identityCheckServices.getIdentityCheckById(args, context)
}

export const createIdentityCheck = (
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

export const updateIdentityCheck = (
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
