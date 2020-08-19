import { PagedResultWorksOrderModel_, CreateWorksOrderItemModel } from '../../types'
import { UserInputError, AuthenticationError } from 'apollo-server-lambda'

import {
  WorksOrderModel,
  UpdateWorksOrderModel,
  PagedResultWorksOrderItemModel_,
  WorksOrderItemModel,
} from '../../types'

export { CreateWorksOrderModel as CreateWorksOrderArgs, WorksOrders as GetWorksOrdersArgs } from '../../types'

export type UpdateWorksOrderArgs = { id: string; _eTag: string } & UpdateWorksOrderModel

// args

export type GetWorksOrdersByIdArgs = {
  id: string
  embed?: 'company' | 'documents' | 'negotiator' | 'property' | 'tenancy' | 'type'
}

export type GetWorksOrderItembyIdArgs = {
  id: string
  itemId: string
}

export type GetWorksOrderItemsArgs = {
  pageNumber?: number
  pageSize?: number
  id: string
}

export type CreateWorksOrderItemArgs = { id: string } & CreateWorksOrderItemModel
export type UpdateWorksOrderItemArgs = CreateWorksOrderItemArgs & { itemId: string; _eTag: string }

// api return types
export type GetWorksOrderItemsReturn = Promise<PagedResultWorksOrderItemModel_ | UserInputError>
export type GetWorksOrderItemByIdReturn = Promise<WorksOrderItemModel | UserInputError>
export type CreateWorksOrderItemReturn = GetWorksOrderItemByIdReturn
export type UpdateWorksOrderItemReturn = GetWorksOrderItemByIdReturn

export type GetWorksOrdersReturn = Promise<PagedResultWorksOrderModel_ | UserInputError>
export type GetWorksOrderByIdReturn = Promise<WorksOrderModel | UserInputError>
export type CreateWorksOrderReturn = GetWorksOrderByIdReturn
export type UpdateWorksOrderReturn = GetWorksOrderByIdReturn

// resolver return types

export type QueryGetWorksOrderItemsReturn = AuthenticationError | GetWorksOrderItemsReturn
export type QueryGetWorksOrderItemByIdReturn = AuthenticationError | GetWorksOrderItemByIdReturn
export type MutationCreateWorksOrderItemReturn = AuthenticationError | CreateWorksOrderItemReturn
export type MutationUpdateWorksOrderItemReturn = AuthenticationError | UpdateWorksOrderItemArgs

export type QueryGetWorksOrdersReturn = AuthenticationError | GetWorksOrdersReturn
export type QueryGetWorksOrdersByIdReturn = AuthenticationError | GetWorksOrderByIdReturn
export type MutationCreateWorksOrder = QueryGetWorksOrdersByIdReturn
export type MutationUpdateWorksOrder = QueryGetWorksOrdersByIdReturn
