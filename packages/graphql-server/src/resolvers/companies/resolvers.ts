import propertyServices from './services'
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
    return propertyServices.getCompanyById(args, context)
  },
)

export const queryGetCompanies = resolverHandler<GetCompaniesArgs, QueryGetCompaniesReturn>(
  (_: any, args: GetCompaniesArgs, context: ServerContext): QueryGetCompaniesReturn => {
    return propertyServices.getCompanies(args, context)
  },
)

export const queryGetCompanyRoles = resolverHandler<GetCompaniesArgs, QueryGetCompaniesReturn>(
  (_: any, args: GetCompanyRolesArgs, context: ServerContext): QueryGetCompanyRolesReturn => {
    return propertyServices.getCompanyRoles(args, context)
  },
)

export const mutationCreateCompany = resolverHandler<CreateCompanyArgs, MutationCreateCompanyReturn>(
  (_: any, args: CreateCompanyArgs, context: ServerContext): MutationCreateCompanyReturn => {
    return propertyServices.createCompany(args, context)
  },
)

export const mutationUpdateCompany = resolverHandler<UpdateCompanyArgs, MutationUpdateCompanyReturn>(
  (_: any, args: UpdateCompanyArgs, context: ServerContext): MutationUpdateCompanyReturn => {
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
