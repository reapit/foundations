import { ServerContext } from '../../utils'
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
  const identityCheck = callGetIdentityCheckByIdAPI(args, context)
  return identityCheck
}

export const getIdentityChecks = (args: GetIdentityChecksArgs, context: ServerContext): GetIdentityChecksReturn => {
  const identityChecks = callGetIdentityChecksAPI(args, context)
  return identityChecks
}

export const createIdentityCheck = (
  args: CreateIdentityCheckArgs,
  context: ServerContext,
): CreateIdentityCheckReturn => {
  const createResult = callCreateIdentityCheckAPI(args, context)
  return createResult
}

export const updateIdentityCheck = (
  args: UpdateIdentityCheckArgs,
  context: ServerContext,
): UpdateIdentityCheckReturn => {
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
