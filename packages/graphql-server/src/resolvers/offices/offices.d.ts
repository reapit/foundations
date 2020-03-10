import { AuthenticationError, UserInputError } from 'apollo-server'
import { OfficeModel, PagedResultOfficeModel_, CreateOfficeModel, UpdateOfficeModel } from '../../types'

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
export type GetOfficesReturn = Promise<PagedResultOfficeModel_ | UserInputError>

// temporarily return boolean, will change later
export type CreateOfficeReturn = Promise<boolean | UserInputError>
export type UpdateOfficeReturn = Promise<OfficeModel | UserInputError>

// resolver type
export type QueryGetOfficeByIdReturn = AuthenticationError | GetOfficeByIdReturn
export type QueryGetOfficesReturn = AuthenticationError | GetOfficesReturn
export type MutationCreateOfficeReturn = AuthenticationError | CreateOfficeReturn
export type MutationUpdateOfficeReturn = AuthenticationError | UpdateOfficeReturn
