import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  GetIdentityCheckByIdArgs,
  CreateIdentityCheckArgs,
  UpdateIdentityCheckArgs,
  GetIdentityChecksArgs,
  GetIdentityCheckByIdReturn,
  GetIdentityChecksReturn,
  CreateIdentityCheckReturn,
  UpdateIdentityCheckReturn,
} from './identity-checks'
import {
  callGetIdentityCheckByIdAPI,
  callGetIdentityChecksAPI,
  callCreateIdentityCheckAPI,
  callUpdateIdentityCheckAPI,
} from './api'

export const getIdentityCheckById = (
  args: GetIdentityCheckByIdArgs,
  context: ServerContext,
): GetIdentityCheckByIdReturn => {
  const traceId = context.traceId
  logger.info('getIdentityCheckById', { traceId, args })
  const identityCheck = callGetIdentityCheckByIdAPI(args, context)
  return identityCheck
}

export const getIdentityChecks = (args: GetIdentityChecksArgs, context: ServerContext): GetIdentityChecksReturn => {
  const traceId = context.traceId
  logger.info('getIdentityChecks', { traceId, args })
  const identityChecks = callGetIdentityChecksAPI(args, context)
  return identityChecks
}

export const createIdentityCheck = (
  args: CreateIdentityCheckArgs,
  context: ServerContext,
): CreateIdentityCheckReturn => {
  const traceId = context.traceId
  logger.info('createIdentityCheck', { traceId, args })
  const createResult = callCreateIdentityCheckAPI(args, context)
  return createResult
}

export const updateIdentityCheck = (
  args: UpdateIdentityCheckArgs,
  context: ServerContext,
): UpdateIdentityCheckReturn => {
  const traceId = context.traceId
  logger.info('updateIdentityCheck', { traceId, args })
  const updateResult = callUpdateIdentityCheckAPI({ ...args }, context)
  return updateResult
}

const identityCheckServices = {
  getIdentityCheckById,
  getIdentityChecks,
  createIdentityCheck,
  updateIdentityCheck,
}

export default identityCheckServices
