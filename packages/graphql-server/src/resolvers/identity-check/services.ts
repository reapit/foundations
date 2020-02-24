import {
  IdentityCheckModel,
  CreateIdentityCheckModel,
  UpdateIdentityCheckModel,
  PagedResultIdentityCheckModel_,
} from '../../types'
import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  callCreateIdentityCheckAPI,
  callUpdateIdentityCheckAPI,
  callGetIdentityCheckByIdAPI,
  callGetIdentityChecksAPI,
} from './api'
import { AuthenticationError, UserInputError } from 'apollo-server'

export type GetIdentityCheckByIdModel = {
  id: string
}

export const getIdentityCheckById = (
  args: GetIdentityCheckByIdModel,
  context: ServerContext,
): Promise<IdentityCheckModel | UserInputError> | AuthenticationError => {
  const traceId = context.traceId
  logger.info('getIdentityCheckById', { traceId, args })
  const identityCheck = callGetIdentityCheckByIdAPI(args, context)
  return identityCheck
}

export type GetIdentityChecksModel = {
  negotiatorId?: string
  contactId?: string
  pageNumber: number
  pageSize: number
  ids?: string[]
  status?: 'unknow' | 'uncheck' | 'pending' | 'fail' | 'cancelled' | 'warnings' | 'pass'
}

export const getIdentityChecks = (
  args: GetIdentityChecksModel,
  context: ServerContext,
): Promise<PagedResultIdentityCheckModel_ | UserInputError> | AuthenticationError => {
  const traceId = context.traceId
  logger.info('getIdentityChecks', { traceId, args })
  const identityChecks = callGetIdentityChecksAPI(args, context)
  return identityChecks
}

export const createIdentityCheck = (
  args: CreateIdentityCheckModel,
  context: ServerContext,
): Promise<IdentityCheckModel | UserInputError> | AuthenticationError => {
  const traceId = context.traceId
  logger.info('createIdentityCheck', { traceId, args })
  const identityCheck = callCreateIdentityCheckAPI(args, context)
  return identityCheck
}

export type UpdateIdentityCheckExtend = UpdateIdentityCheckModel & {
  id: string
  _eTag: string
}

export const updateIdentityCheck = (
  args: UpdateIdentityCheckExtend,
  context: ServerContext,
): Promise<IdentityCheckModel | UserInputError> | AuthenticationError => {
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
