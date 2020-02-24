import logger from '../../logger'
import { ServerContext } from '../../app'
import { checkPermission } from '../../utils/check-permission'
import errors from '../../errors'
import identityCheckServices from '../identity-check/services'
import { IdentityCheckModel, CreateIdentityCheckModel, PagedResultIdentityCheckModel_ } from '../../types'
import { GetIdentityCheckByIdModel, GetIdentityChecksModel, UpdateIdentityCheckExtend } from './services'
import { AuthenticationError, UserInputError } from 'apollo-server'

export const queryIdentityChecks = (
  _: any,
  args: GetIdentityChecksModel,
  context: ServerContext,
): Promise<PagedResultIdentityCheckModel_ | UserInputError> | AuthenticationError => {
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
  args: GetIdentityCheckByIdModel,
  context: ServerContext,
): Promise<IdentityCheckModel | UserInputError> | AuthenticationError => {
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
  args: CreateIdentityCheckModel,
  context: ServerContext,
): Promise<IdentityCheckModel | UserInputError> | AuthenticationError => {
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
  args: UpdateIdentityCheckExtend,
  context: ServerContext,
): Promise<IdentityCheckModel | UserInputError> | AuthenticationError => {
  const traceId = context.traceId
  logger.info('updateIdentityCheck', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return identityCheckServices.updateIdentityCheck(args, context)
}
