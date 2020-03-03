import { CreateOfficeModel, UpdateOfficeModel, OfficeModel, PagedResultOfficeModel_ } from '@/types'
import { UserInputError, AuthenticationError } from 'apollo-server'

export interface GetOfficeArgs {
  id: string
}

export interface GetOfficesArgs {
  pageSize?: number

  pageNumber?: number

  sortBy?: string

  id?: string[]

  address?: string

  name?: string
}

export type CreateOfficeArgs = CreateOfficeModel

export type UpdateOfficeArgs = { id: string; _eTag: string } & UpdateOfficeModel

/* return type */
export type GetOfficeByIdReturn = Promise<OfficeModel | UserInputError>
export type GetOfficesReturn = Promise<PagedResultOfficeModel_ | UserInputError>

/* temporarily return boolean till BE fixes the response of create Office API */
export type CreateOfficeReturn = Promise<Boolean | UserInputError>
export type UpdateOfficeReturn = Promise<OfficeModel | UserInputError>

/* resolver type */
export type QueryOfficeReturn = AuthenticationError | GetOfficeByIdReturn
export type QueryOfficesReturn = AuthenticationError | GetOfficesReturn
export type MutationCreateOfficeReturn = AuthenticationError | CreateOfficeReturn
export type MutationUpdateOfficeReturn = AuthenticationError | UpdateOfficeReturn
