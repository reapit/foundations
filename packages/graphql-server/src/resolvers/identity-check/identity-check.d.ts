import { AuthenticationError, UserInputError } from 'apollo-server'
import {
  CreateIdentityCheckModel,
  UpdateIdentityCheckModel,
  IdentityCheckModel,
  PagedResultIdentityCheckModel_,
} from '../../types'

/* args type */
export type GetIdentityCheckByIdArgs = {
  id: string
}

export type GetIdentityChecksArgs = {
  negotiatorId?: string
  contactId?: string
  pageNumber: number
  pageSize: number
  ids?: string[]
  status?: 'unknow' | 'uncheck' | 'pending' | 'fail' | 'cancelled' | 'warnings' | 'pass'
}

export type CreateIdentityCheckArgs = {
  model: CreateIdentityCheckModel
}

export type UpdateIdentityCheckArgs = {
  id: string
  model: UpdateIdentityCheckModel & { _eTag: string }
}

/* return type */
export type GetIdentityCheckByIdReturn = Promise<IdentityCheckModel | UserInputError>
export type GetIdentityChecksReturn = Promise<PagedResultIdentityCheckModel_ | UserInputError>
/* temporary return boolean, will change later */
export type CreateIdentityCheckReturn = Promise<IdentityCheckModel | UserInputError>
export type UpdateIdentityCheckReturn = Promise<IdentityCheckModel | UserInputError>

/* resolver type */
export type QueryIdentityCheckReturn = AuthenticationError | GetIdentityCheckByIdReturn
export type QueryIdentityChecksReturn = AuthenticationError | GetIdentityChecksReturn
export type MutationCreateIdentityCheckReturn = AuthenticationError | CreateIdentityCheckReturn
export type MutationUpdateIdentityCheckReturn = AuthenticationError | UpdateIdentityCheckReturn
