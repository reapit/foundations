import { AuthenticationError, UserInputError } from 'apollo-server-lambda'
import {
  SourceModel,
  SourceModelPagedResult,
  CreateSourceModel,
  UpdateSourceModel,
} from '@reapit/foundations-ts-definitions'

export type CreateSourceArgs = CreateSourceModel

export type UpdateSourceArgs = { id: string; _eTag: string } & UpdateSourceModel

export type GetSourceByIdArgs = {
  id: string
}

export type SourceType = 'advertisement' | 'source'

export type GetSourcesArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  id?: string[]
  officeId?: string[]
  departmentId?: string[]
  name?: string
  type?: SourceType
  createdFrom?: string
  createdTo?: string
}

// api return type
export type GetSourceByIdReturn = Promise<SourceModel | UserInputError>
export type GetSourcesReturn = Promise<SourceModelPagedResult | UserInputError>
export type CreateSourceReturn = Promise<SourceModel | UserInputError>
export type UpdateSourceReturn = Promise<SourceModel | UserInputError>

// resolver type
export type QueryGetSourceByIdReturn = AuthenticationError | GetSourceByIdReturn
export type QueryGetSourcesReturn = AuthenticationError | GetSourcesReturn
export type MutationCreateSourceReturn = AuthenticationError | CreateSourceReturn
export type MutationUpdateSourceReturn = AuthenticationError | UpdateSourceReturn
