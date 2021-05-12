import propertyServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../utils'
import {
  GetCompanyByIdArgs,
  CreateCompanyArgs,
  GetCompaniesArgs,
  UpdateCompanyArgs,
  QueryGetCompanyByIdReturn,
  QueryGetCompaniesReturn,
  MutationCreateCompanyReturn,
  MutationUpdateCompanyReturn,
  GetCompanyRolesArgs,
  QueryGetCompanyRolesReturn,
} from './companies'

export const queryGetCompanyById = (
  _: any,
  args: GetCompanyByIdArgs,
  context: ServerContext,
): QueryGetCompanyByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetCompanyById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.getCompanyById(args, context)
}

export const queryGetCompanies = (_: any, args: GetCompaniesArgs, context: ServerContext): QueryGetCompaniesReturn => {
  const traceId = context.traceId
  logger.info('queryGetCompanies', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.getCompanies(args, context)
}

export const queryGetCompanyRoles = (
  _: any,
  args: GetCompanyRolesArgs,
  context: ServerContext,
): QueryGetCompanyRolesReturn => {
  const traceId = context.traceId
  logger.info('queryGetCompanyRoles', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.getCompanyRoles(args, context)
}

export const mutationCreateCompany = (
  _: any,
  args: CreateCompanyArgs,
  context: ServerContext,
): MutationCreateCompanyReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateCompany', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.createCompany(args, context)
}

export const mutationUpdateCompany = (
  _: any,
  args: UpdateCompanyArgs,
  context: ServerContext,
): MutationUpdateCompanyReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateCompany', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.updateCompany(args, context)
}

export default {
  Query: {
    GetCompanyById: queryGetCompanyById,
    GetCompanies: queryGetCompanies,
    GetCompanyRoles: queryGetCompanyRoles,
  },
  Mutation: {
    CreateCompany: mutationCreateCompany,
    UpdateCompany: mutationUpdateCompany,
  },
}
