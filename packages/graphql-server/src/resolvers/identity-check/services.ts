import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  callCreateIdentityCheckAPI,
  callUpdateIdentityCheckAPI,
  callGetIdentityCheckByIdAPI,
  callGetIdentityChecksAPI,
} from './api'
import {
  GetIdentityChecksArgs,
  GetIdentityCheckByIdReturn,
  GetIdentityCheckByIdArgs,
  GetIdentityChecksReturn,
  CreateIdentityCheckArgs,
  UpdateIdentityCheckArgs,
  UpdateIdentityCheckReturn,
  CreateIdentityCheckReturn,
} from './identity-check'

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
  const identityCheck = callCreateIdentityCheckAPI(args, context)
  return identityCheck
}

export const updateIdentityCheck = (
  args: UpdateIdentityCheckArgs,
  context: ServerContext,
): UpdateIdentityCheckReturn => {
  const traceId = context.traceId
  logger.info('updateIdentityCheck', { traceId, args })
  const identityCheck = callUpdateIdentityCheckAPI(args, context)
  return identityCheck
}

const identityCheckServices = {
  getIdentityCheckById,
  getIdentityChecks,
  createIdentityCheck,
  updateIdentityCheck,
}

export default identityCheckServices
