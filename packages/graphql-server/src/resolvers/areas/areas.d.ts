import { AuthenticationError, UserInputError } from 'apollo-server'
import { AreaModel, PagedResultAreaModel_, CreateAreaModel, UpdateAreaModel } from '../../types'

export type CreateAreaArgs = CreateAreaModel

export type UpdateAreaArgs = { id: string; _eTag: string } & UpdateAreaModel

export type GetAreaByIdArgs = {
  id: string
}

export type GetAreasArgs = {
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
export type GetAreaByIdReturn = Promise<AreaModel | UserInputError>
export type GetAreasReturn = Promise<PagedResultAreaModel_ | UserInputError>

// temporarily return boolean, will change later
export type CreateAreaReturn = Promise<boolean | UserInputError>
export type UpdateAreaReturn = Promise<AreaModel | UserInputError>

// resolver type
export type QueryGetAreaByIdReturn = AuthenticationError | GetAreaByIdReturn
export type QueryGetAreasReturn = AuthenticationError | GetAreasReturn
export type MutationCreateAreaReturn = AuthenticationError | CreateAreaReturn
export type MutationUpdateAreaReturn = AuthenticationError | UpdateAreaReturn
