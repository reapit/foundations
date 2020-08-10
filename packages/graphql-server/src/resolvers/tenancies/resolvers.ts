import tenancyServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../index'
import {
  GetTenancyByIdArgs,
  QueryGetTenancyByIdReturn,
  GetTenanciesArgs,
  QueryGetTenanciesReturn,
  GetTenancyRelationshipsArgs,
  QueryGetTenancyRelationshipsReturn,
  GetTenancyChecksArgs,
  QueryGetTenancyChecksReturn,
  GetTenancyCheckByIdArgs,
  QueryGetTenancyCheckByIdReturn,
  CreateTenancyArgs,
  MutationCreateTenancyReturn,
  CreateTenancyCheckArgs,
  MutationCreateTenancyCheckReturn,
  DeleteTenancyCheckArgs,
  MutationDeleteTenancyCheckReturn,
  UpdateTenancyCheckArgs,
  MutationUpdateTenancyCheckReturn,
} from './tenancies'

export const queryGetTenancyById = (
  _: any,
  args: GetTenancyByIdArgs,
  context: ServerContext,
): QueryGetTenancyByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetTenancyById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return tenancyServices.getTenancyById(args, context)
}

export const queryGetTenancies = (_: any, args: GetTenanciesArgs, context: ServerContext): QueryGetTenanciesReturn => {
  const traceId = context.traceId
  logger.info('queryGetTenancies', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return tenancyServices.getTenancies(args, context)
}

export const queryGetTenancyCheckById = (
  _: any,
  args: GetTenancyCheckByIdArgs,
  context: ServerContext,
): QueryGetTenancyCheckByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetTenancyCheckById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return tenancyServices.getTenancyCheckById(args, context)
}

export const queryGetTenancyChecks = (
  _: any,
  args: GetTenancyChecksArgs,
  context: ServerContext,
): QueryGetTenancyChecksReturn => {
  const traceId = context.traceId
  logger.info('queryGetTenancyChecks', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return tenancyServices.getTenancyChecks(args, context)
}

export const queryGetTenancyRelationships = (
  _: any,
  args: GetTenancyRelationshipsArgs,
  context: ServerContext,
): QueryGetTenancyRelationshipsReturn => {
  const traceId = context.traceId
  logger.info('queryGetTenancyRelationships', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return tenancyServices.getTenancyRelationships(args, context)
}

export const mutationCreateTenancy = (
  _: any,
  args: CreateTenancyArgs,
  context: ServerContext,
): MutationCreateTenancyReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateTenancy', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return tenancyServices.createTenancy(args, context)
}

export const mutationCreateTenancyCheck = (
  _: any,
  args: CreateTenancyCheckArgs,
  context: ServerContext,
): MutationCreateTenancyCheckReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateTenancyCheck', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return tenancyServices.createTenancyCheck(args, context)
}

export const mutationDeleteTenancyCheck = (
  _: any,
  args: DeleteTenancyCheckArgs,
  context: ServerContext,
): MutationDeleteTenancyCheckReturn => {
  const traceId = context.traceId
  logger.info('mutationDeleteTenancyCheck', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return tenancyServices.deleteTenancyCheck(args, context)
}

export const mutationUpdateTenancyCheck = (
  _: any,
  args: UpdateTenancyCheckArgs,
  context: ServerContext,
): MutationUpdateTenancyCheckReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateTenancyCheck', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return tenancyServices.updateTenancyCheck(args, context)
}

export default {
  Query: {
    GetTenancies: getTenancies,
    GetTenancyById: getTenancyById,
    GetTenancyRelationships: getTenancyRelationships,
    GetTenancyChecks: getTenancyChecks,
    GetTenancyCheckById: getTenancyCheckById,
  },
  Mutation: {
    CreateTenancy: mutationCreateTenancy,
    CreateTenancyCheck: mutationCreateTenancyCheck,
    DeleteTenancyCheck: mutationDeleteTenancyCheck,
    UpdateTenancyCheck: mutationUpdateTenancyCheck,
  },
}
