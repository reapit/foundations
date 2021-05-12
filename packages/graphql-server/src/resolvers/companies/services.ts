import logger from '../../logger'
import { ServerContext } from '../../utils'
import {
  GetCompanyByIdArgs,
  CreateCompanyArgs,
  UpdateCompanyArgs,
  GetCompaniesArgs,
  GetCompanyRolesArgs,
  GetCompanyByIdReturn,
  GetCompaniesReturn,
  GetCompanyRolesReturn,
  CreateCompanyReturn,
  UpdateCompanyReturn,
} from './companies'
import {
  callGetCompanyByIdAPI,
  callGetCompaniesAPI,
  callCreateCompanyAPI,
  callUpdateCompanyAPI,
  callGetCompanyRolesAPI,
} from './api'

export const getCompanyById = (args: GetCompanyByIdArgs, context: ServerContext): GetCompanyByIdReturn => {
  const traceId = context.traceId
  logger.info('getCompanyById', { traceId, args })
  const property = callGetCompanyByIdAPI(args, context)
  return property
}

export const getCompanies = (args: GetCompaniesArgs, context: ServerContext): GetCompaniesReturn => {
  const traceId = context.traceId
  logger.info('getCompanies', { traceId, args })
  const companies = callGetCompaniesAPI(args, context)
  return companies
}

export const getCompanyRoles = (args: GetCompanyRolesArgs, context: ServerContext): GetCompanyRolesReturn => {
  const traceId = context.traceId
  logger.info('getCompanyRoles', { traceId, args })
  const companyRoles = callGetCompanyRolesAPI(args, context)
  return companyRoles
}

export const createCompany = (args: CreateCompanyArgs, context: ServerContext): CreateCompanyReturn => {
  const traceId = context.traceId
  logger.info('createCompany', { traceId, args })
  const createResult = callCreateCompanyAPI(args, context)
  return createResult
}

export const updateCompany = (args: UpdateCompanyArgs, context: ServerContext): UpdateCompanyReturn => {
  const traceId = context.traceId
  logger.info('updateCompany', { traceId, args })
  const updateResult = callUpdateCompanyAPI({ ...args }, context)
  return updateResult
}

const propertyServices = {
  getCompanyById,
  getCompanies,
  getCompanyRoles,
  createCompany,
  updateCompany,
}

export default propertyServices
