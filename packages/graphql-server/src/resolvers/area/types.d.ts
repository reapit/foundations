import { AuthenticationError, UserInputError } from 'apollo-server'
import { AreaModel, CreateAreaModel, PagedResultAreaModel_, UpdateAreaModel } from '../../types'

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
