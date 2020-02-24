import { AuthenticationError, UserInputError } from 'apollo-server'

export interface AreaModel {
  id?: string
  created?: string // date-time
  modified?: string // date-time
  name?: string
  active?: boolean
  type?: string
  area?: string[]
  departmentIds?: string[]
  officeIds?: string[]
  readonly _eTag?: string
  readonly _links?: {
    [name: string]: LinkModel
  }
  readonly _embedded?: {
    [name: string]: {}
  }
}

export interface CreateAreaModel {
  name?: string
  type?: string
  area?: string[]
  departmentIds?: string[]
  officeIds?: string[]
  parentId?: string
}

export interface LinkModel {
  href?: string
}

export interface PagedResultAreaModel_ {
  _embedded?: AreaModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: PagingLinkModel
  }
}

export interface PagingLinkModel {
  href?: string
}

export interface UpdateAreaModel {
  name?: string
  area?: string[]
  departmentIds?: string[]
  officeIds?: string[]
}

/* args type */
export interface GetAreaByIdArgs {
  id: string
}
export interface GetAreasArgs {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  id?: string[]
  departmentId?: string[]
  officeId?: string[]
  name?: string
  active?: boolean
}
export type CreateAreaArgs = CreateAreaModel
export type UpdateAreaArgs = { id: string; _eTag?: string } & UpdateAreaModel

/* return type */
export type GetAreaByIdReturn = Promise<AreaModel | UserInputError>
export type GetAreasReturn = Promise<PagedResultAreaModel_ | UserInputError>
/* temporary return boolean, will change later */
export type CreateAreaReturn = Promise<boolean | UserInputError>
export type UpdateAreaReturn = Promise<boolean | UserInputError>

/* resolver type */
export type QueryAreaReturn = AuthenticationError | GetAreaByIdReturn
export type QueryAreasReturn = AuthenticationError | GetAreasReturn
export type MutationCreateAreaReturn = AuthenticationError | CreateAreaReturn
export type MutationUpdateAreaReturn = AuthenticationError | UpdateAreaReturn
