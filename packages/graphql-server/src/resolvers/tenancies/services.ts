import logger from '../../logger'
import { ServerContext } from '../../index'
import {
  GetTenancyByIdArgs,
  GetTenancyByIdReturn,
  GetTenanciesArgs,
  GetTenanciesReturn,
  GetTenancyRelationshipsArgs,
  GetTenancyRelationshipsReturn,
  GetTenancyChecksArgs,
  GetTenancyChecksReturn,
  GetTenancyCheckByIdArgs,
  GetTenancyCheckByIdReturn,
  CreateTenancyArgs,
  CreateTenancyReturn,
  CreateTenancyCheckArgs,
  CreateTenancyCheckReturn,
  DeleteTenancyCheckArgs,
  DeleteTenancyCheckReturn,
  UpdateTenancyCheckArgs,
  UpdateTenancyCheckReturn,
} from './tenancies'
import {
  callGetTenancyByIdAPI,
  callGetTenanciesAPI,
  callGetTenancyChecksAPI,
  callGetTenancyCheckByIdAPI,
  callGetTenancyRelationshipsAPI,
  callCreateTenancyAPI,
  callCreateTenancyCheckAPI,
  callDeleteTenancyCheckAPI,
  callUpdateTenancyCheckAPI,
} from './api'

export const getTenancyById = (args: GetTenancyByIdArgs, context: ServerContext): GetTenancyByIdReturn => {
  const traceId = context.traceId
  logger.info('getTenancyById', { traceId, args })
  const tenancy = callGetTenancyByIdAPI(args, context)
  return tenancy
}

export const getTenancies = (args: GetTenanciesArgs, context: ServerContext): GetTenanciesReturn => {
  const traceId = context.traceId
  logger.info('getTenancies', { traceId, args })
  const tenancies = callGetTenanciesAPI(args, context)
  return tenancies
}

export const getTenancyCheckById = (
  args: GetTenancyCheckByIdArgs,
  context: ServerContext,
): GetTenancyCheckByIdReturn => {
  const traceId = context.traceId
  logger.info('getTenancyCheckById', { traceId, args })
  const tenancyCheck = callGetTenancyCheckByIdAPI(args, context)
  return tenancyCheck
}

export const getTenancyChecks = (args: GetTenancyChecksArgs, context: ServerContext): GetTenancyChecksReturn => {
  const traceId = context.traceId
  logger.info('getTenancyChecks', { traceId, args })
  const tenancyChecks = callGetTenancyChecksAPI(args, context)
  return tenancyChecks
}

export const getTenancyRelationships = (
  args: GetTenancyRelationshipsArgs,
  context: ServerContext,
): GetTenancyRelationshipsReturn => {
  const traceId = context.trjceId
  logger.info('getTenancyRelationships', { traceId, args })
  const tenancyRelationships = callGetTenancyRelationshipsAPI(args, context)
  return tenancyRelationships
}

export const createTenancy = (args: CreateTenancyArgs, context: ServerContext): CreateTenancyReturn => {
  const traceId = context.traceId
  logger.info('createTenancy', { traceId, args })
  const createdTenancy = callCreateTenancyAPI(args, context)
  return createdTenancy
}

export const createTenancyCheck = (args: CreateTenancyCheckArgs, context: ServerContext): CreateTenancyCheckReturn => {
  const traceId = context.traceId
  logger.info('createTenancyCheck', { traceId, args })
  const createdTenancyCheck = callCreateTenancyCheckAPI(args, context)
  return createdTenancyCheck
}

export const updateTenancyCheck = (args: UpdateTenancyCheckArgs, context: ServerContext): UpdateTenancyCheckReturn => {
  const traceId = context.traceId
  logger.info('updateTenancyCheck', { traceId, args })
  const updatedTenancyCheck = callUpdateTenancyCheckAPI(args, context)
  return updatedTenancyCheck
}

export const deleteTenancyCheck = (args: DeleteTenancyCheckArgs, context: ServerContext): DeleteTenancyCheckReturn => {
  const traceId = context.traceId
  logger.info('deleteTenancyCheck', { traceId, args })
  const isDeleted = callDeleteTenancyCheckAPI(args, context)
  return isDeleted
}

const tenancyServices = {
  getTenancyById,
  getTenancies,
  getTenancyChecks,
  getTenancyCheckById,
  getTenancyRelationships,
  createTenancy,
  createTenancyCheck,
  deleteTenancyCheck,
  updateTenancyCheck,
}

export default tenancyServices
