import { AuthenticationError, UserInputError } from 'apollo-server-lambda'
import {
  PagedResultTenancyModel_,
  PagedResultTenancyContactRelationshipModel_,
  PagedResultTenancyCheckModel_,
  TenancyModel,
  TenancyCheckModel,
  CreateTenancyModel,
  CreateTenancyCheckModel,
  UpdateTenancyCheckModel,
  Tenancies,
} from '../../types'

export type GetTenanciesArgs = Tenancies
export type GetTenancyByIdArgs = { id: string }
export type GetTenancyRelationshipsArgs = { id: string; pageSize?: number; pageNumber?: number }
export type GetTenancyChecksArgs = { id: string; pageSize?: number; pageNumber?: number }
export type GetTenancyCheckByIdArgs = { id: string; checkId: string }

export type CreateTenancyArgs = { request: CreateTenancyModel }
export type CreateTenancyCheckArgs = { id: string; model: CreateTenancyCheckModel }
export type DeleteTenancyCheckArgs = { id: string; checkId: string }
export type UpdateTenancyCheckArgs = { id: string; checkId: string; _eTag: string } & UpdateTenancyCheckModel

// api return type
export type GetTenanciesReturn = Promise<PagedResultTenancyModel_ | UserInputError>
export type GetTenancyByIdReturn = Promise<TenancyModel | UserInputError>
export type GetTenancyRelationshipsReturn = Promise<PagedResultTenancyContactRelationshipModel_ | UserInputError>
export type GetTenancyChecksReturn = Promise<PagedResultTenancyCheckModel_ | UserInputError>
export type GetTenancyCheckByIdReturn = Promise<TenancyCheckModel | UserInputError>

export type CreateTenancyReturn = Promise<TenancyModel | UserInputError>
export type CreateTenancyCheckReturn = Promise<TenancyCheckModel | UserInputError>
export type DeleteTenancyCheckReturn = Promise<boolean | UserInputError>
export type UpdateTenancyCheckReturn = Promise<TenancyCheckModel | UserInputError>

// resolver type
export type QueryGetTenanciesReturn = AuthenticationError | GetTenanciesReturn
export type QueryGetTenancyByIdReturn = AuthenticationError | GetTenancyByIdReturn
export type QueryGetTenancyRelationshipsReturn = AuthenticationError | GetTenancyRelationshipsReturn
export type QueryGetTenancyChecksReturn = AuthenticationError | GetTenancyChecksReturn
export type QueryGetTenancyCheckByIdReturn = AuthenticationError | GetTenancyCheckByIdReturn

export type MutationCreateTenancyReturn = AuthenticationError | CreateTenancyReturn
export type MutationCreateTenancyCheckReturn = AuthenticationError | CreateTenancyCheckReturn
export type MutationDeleteTenancyCheckReturn = AuthenticationError | DeleteTenancyCheckReturn
export type MutationUpdateTenancyCheckReturn = AuthenticationError | UpdateTenancyCheckReturn
