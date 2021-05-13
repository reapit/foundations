import propertyServices from './services'
import logger from '../../logger'
import { resolverHandler, ServerContext } from '../../utils'
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

export const queryGetCompanyById = resolverHandler<GetCompanyByIdArgs, QueryGetCompanyByIdReturn>(
  (_: any, args: GetCompanyByIdArgs, context: ServerContext): QueryGetCompanyByIdReturn => {
    const traceId = context.traceId
    logger.info('queryGetCompanyById', { traceId, args })
    return propertyServices.getCompanyById(args, context)
  },
)

export const queryGetCompanies = resolverHandler<GetCompaniesArgs, QueryGetCompaniesReturn>(
  (_: any, args: GetCompaniesArgs, context: ServerContext): QueryGetCompaniesReturn => {
    const traceId = context.traceId
    logger.info('queryGetCompanies', { traceId, args })
    return propertyServices.getCompanies(args, context)
  },
)

export const queryGetCompanyRoles = resolverHandler<GetCompaniesArgs, QueryGetCompaniesReturn>(
  (_: any, args: GetCompanyRolesArgs, context: ServerContext): QueryGetCompanyRolesReturn => {
    const traceId = context.traceId
    logger.info('queryGetCompanyRoles', { traceId, args })
    return propertyServices.getCompanyRoles(args, context)
  },
)

export const mutationCreateCompany = resolverHandler<CreateCompanyArgs, MutationCreateCompanyReturn>(
  (_: any, args: CreateCompanyArgs, context: ServerContext): MutationCreateCompanyReturn => {
    const traceId = context.traceId
    logger.info('mutationCreateCompany', { traceId, args })
    return propertyServices.createCompany(args, context)
  },
)

export const mutationUpdateCompany = resolverHandler<UpdateCompanyArgs, MutationUpdateCompanyReturn>(
  (_: any, args: UpdateCompanyArgs, context: ServerContext): MutationUpdateCompanyReturn => {
    const traceId = context.traceId
    logger.info('mutationUpdateCompany', { traceId, args })
    return propertyServices.updateCompany(args, context)
  },
)

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
