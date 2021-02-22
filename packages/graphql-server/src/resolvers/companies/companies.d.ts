import { AuthenticationError, UserInputError } from 'apollo-server-lambda'
import {
  CompanyModel,
  CompanyModelPagedResult,
  CreateCompanyModel,
  UpdateCompanyModel,
  CompanyRoleModelPagedResult,
} from '@reapit/foundations-ts-definitions'

export type CreateCompanyArgs = CreateCompanyModel

export type UpdateCompanyArgs = { id: string; _eTag: string } & UpdateCompanyModel

export type GetCompanyByIdArgs = {
  id: string
  embed?: string[]
}

export type GetCompaniesArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  id?: string[]
  address?: string
  branch?: string
  name?: string
  typeId?: string
  createdFrom?: string
  createdTo?: string
}

export type GetCompanyRolesArgs = {
  pageSize?: number
  pageNumber?: number
  id?: string[]
}

// api return type
export type GetCompanyByIdReturn = Promise<CompanyModel | UserInputError>
export type GetCompaniesReturn = Promise<CompanyModelPagedResult | UserInputError>
export type GetCompanyRolesReturn = Promise<CompanyRoleModelPagedResult | UserInputError>
export type CreateCompanyReturn = Promise<CompanyModel | UserInputError>
export type UpdateCompanyReturn = Promise<CompanyModel | UserInputError>

// resolver type
export type QueryGetCompanyByIdReturn = AuthenticationError | GetCompanyByIdReturn
export type QueryGetCompaniesReturn = AuthenticationError | GetCompaniesReturn
export type QueryGetCompanyRolesReturn = AuthenticationError | GetCompanyRolesReturn
export type MutationCreateCompanyReturn = AuthenticationError | CreateCompanyReturn
export type MutationUpdateCompanyReturn = AuthenticationError | UpdateCompanyReturn
