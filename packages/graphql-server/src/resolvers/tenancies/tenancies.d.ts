import { UserInputError } from 'apollo-server-lambda'
import {
  TenancyModelPagedResult,
  TenancyContactRelationshipModelPagedResult,
  TenancyCheckModelPagedResult,
  TenancyModel,
  TenancyCheckModel,
  CreateTenancyModel,
  CreateTenancyCheckModel,
  UpdateTenancyCheckModel,
  Tenancies,
} from '@reapit/foundations-ts-definitions'

export type GetTenanciesArgs = Tenancies
export type GetTenancyByIdArgs = { id: string }
export type GetTenancyRelationshipsArgs = { id: string; pageSize?: number; pageNumber?: number }
export type GetTenancyChecksArgs = { id: string; pageSize?: number; pageNumber?: number }
export type GetTenancyCheckByIdArgs = { id: string; checkId: string }

export type CreateTenancyArgs = CreateTenancyModel
export type CreateTenancyCheckArgs = { id: string } & CreateTenancyCheckModel
export type DeleteTenancyCheckArgs = { id: string; checkId: string }
export type UpdateTenancyCheckArgs = { id: string; checkId: string; _eTag: string } & UpdateTenancyCheckModel

// api return type
export type GetTenanciesReturn = Promise<TenancyModelPagedResult | UserInputError>
export type GetTenancyByIdReturn = Promise<TenancyModel | UserInputError>
export type GetTenancyRelationshipsReturn = Promise<TenancyContactRelationshipModelPagedResult | UserInputError>
export type GetTenancyChecksReturn = Promise<TenancyCheckModelPagedResult | UserInputError>
export type GetTenancyCheckByIdReturn = Promise<TenancyCheckModel | UserInputError>

export type CreateTenancyReturn = Promise<TenancyModel | UserInputError>
export type CreateTenancyCheckReturn = Promise<TenancyCheckModel | UserInputError>
export type DeleteTenancyCheckReturn = Promise<boolean | UserInputError>
export type UpdateTenancyCheckReturn = Promise<TenancyCheckModel | UserInputError>

// resolver type
export type QueryGetTenanciesReturn = GetTenanciesReturn
export type QueryGetTenancyByIdReturn = GetTenancyByIdReturn
export type QueryGetTenancyRelationshipsReturn = GetTenancyRelationshipsReturn
export type QueryGetTenancyChecksReturn = GetTenancyChecksReturn
export type QueryGetTenancyCheckByIdReturn = GetTenancyCheckByIdReturn

export type MutationCreateTenancyReturn = CreateTenancyReturn
export type MutationCreateTenancyCheckReturn = CreateTenancyCheckReturn
export type MutationDeleteTenancyCheckReturn = DeleteTenancyCheckReturn
export type MutationUpdateTenancyCheckReturn = UpdateTenancyCheckReturn
