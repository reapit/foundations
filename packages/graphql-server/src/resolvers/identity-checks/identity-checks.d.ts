import { UserInputError } from 'apollo-server-lambda'
import {
  IdentityCheckModel,
  IdentityCheckModelPagedResult,
  CreateIdentityCheckModel,
  UpdateIdentityCheckModel,
} from '@reapit/foundations-ts-definitions'

export type CreateIdentityCheckArgs = CreateIdentityCheckModel

export type UpdateIdentityCheckArgs = { id: string; _eTag: string } & UpdateIdentityCheckModel

export type GetIdentityCheckByIdArgs = {
  id: string
}

export type GetIdentityChecksArgs = {
  id?: string[]
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  contactId?: string[]
  negotiatorId?: string[]
  checkDateFrom?: string
  checkDateTo?: string
  createdFrom?: string
  createdTo?: string
  status?: string[]
}

// api return type
export type GetIdentityCheckByIdReturn = Promise<IdentityCheckModel | UserInputError>
export type GetIdentityChecksReturn = Promise<IdentityCheckModelPagedResult | UserInputError>
export type CreateIdentityCheckReturn = Promise<IdentityCheckModel | UserInputError>
export type UpdateIdentityCheckReturn = Promise<IdentityCheckModel | UserInputError>

// resolver type
export type QueryGetIdentityCheckByIdReturn = GetIdentityCheckByIdReturn
export type QueryGetIdentityChecksReturn = GetIdentityChecksReturn
export type MutationCreateIdentityCheckReturn = CreateIdentityCheckReturn
export type MutationUpdateIdentityCheckReturn = UpdateIdentityCheckReturn
