import { UserInputError } from 'apollo-server-lambda'
import {
  NegotiatorModel,
  NegotiatorModelPagedResult,
  CreateNegotiatorModel,
  UpdateNegotiatorModel,
} from '@reapit/foundations-ts-definitions'

export type CreateNegotiatorArgs = CreateNegotiatorModel

export type UpdateNegotiatorArgs = { id: string; _eTag: string } & UpdateNegotiatorModel

export type GetNegotiatorByIdArgs = {
  id: string
  embed?: string[]
}

export type GetNegotiatorsArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  id?: string[]
  departmentId?: string[]
  officeId?: string[]
  name?: string
  active?: boolean
}

// api return type
export type GetNegotiatorByIdReturn = Promise<NegotiatorModel | UserInputError>
export type GetNegotiatorsReturn = Promise<NegotiatorModelPagedResult | UserInputError>
export type CreateNegotiatorReturn = Promise<NegotiatorModel | UserInputError>
export type UpdateNegotiatorReturn = Promise<NegotiatorModel | UserInputError>

// resolver type
export type QueryGetNegotiatorByIdReturn = GetNegotiatorByIdReturn
export type QueryGetNegotiatorsReturn = GetNegotiatorsReturn
export type MutationCreateNegotiatorReturn = CreateNegotiatorReturn
export type MutationUpdateNegotiatorReturn = UpdateNegotiatorReturn
