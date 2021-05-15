import { UserInputError } from 'apollo-server-lambda'
import {
  OfficeModel,
  OfficeModelPagedResult,
  CreateOfficeModel,
  UpdateOfficeModel,
} from '@reapit/foundations-ts-definitions'

export type CreateOfficeArgs = CreateOfficeModel

export type UpdateOfficeArgs = { id: string; _eTag: string } & UpdateOfficeModel

export type GetOfficeByIdArgs = {
  id: string
  embed?: string[]
}

export type GetOfficesArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  id?: string[]
  address?: string
  name?: string
  embed?: string[]
}

// api return type
export type GetOfficeByIdReturn = Promise<OfficeModel | UserInputError>
export type GetOfficesReturn = Promise<OfficeModelPagedResult | UserInputError>
export type CreateOfficeReturn = Promise<OfficeModel | UserInputError>
export type UpdateOfficeReturn = Promise<OfficeModel | UserInputError>

// resolver type
export type QueryGetOfficeByIdReturn = GetOfficeByIdReturn
export type QueryGetOfficesReturn = GetOfficesReturn
export type MutationCreateOfficeReturn = CreateOfficeReturn
export type MutationUpdateOfficeReturn = UpdateOfficeReturn
