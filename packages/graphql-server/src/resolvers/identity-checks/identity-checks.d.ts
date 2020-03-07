import { AuthenticationError, UserInputError } from 'apollo-server'
import {
  IdentityCheckModel,
  PagedResultIdentityCheckModel_,
  CreateIdentityCheckModel,
  UpdateIdentityCheckModel,
} from '../../types'

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
export type GetIdentityChecksReturn = Promise<PagedResultIdentityCheckModel_ | UserInputError>

// temporarily return boolean, will change later
export type CreateIdentityCheckReturn = Promise<boolean | UserInputError>
export type UpdateIdentityCheckReturn = Promise<boolean | UserInputError>

// resolver type
export type QueryGetIdentityCheckByIdReturn = AuthenticationError | GetIdentityCheckByIdReturn
export type QueryGetIdentityChecksReturn = AuthenticationError | GetIdentityChecksReturn
export type MutationCreateIdentityCheckReturn = AuthenticationError | CreateIdentityCheckReturn
export type MutationUpdateIdentityCheckReturn = AuthenticationError | UpdateIdentityCheckReturn
