import { WorksOrderModelPagedResult, CreateWorksOrderItemModel } from '@reapit/foundations-ts-definitions'
import { UserInputError, AuthenticationError } from 'apollo-server-lambda'

import {
  WorksOrderModel,
  UpdateWorksOrderModel,
  WorksOrderItemModelPagedResult,
  WorksOrderItemModel,
} from '@reapit/foundations-ts-definitions'

export {
  CreateWorksOrderModel as CreateWorksOrderArgs,
  WorksOrders as GetWorksOrdersArgs,
} from '@reapit/foundations-ts-definitions'

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
export type DeleteWorksOrderItemArgs = GetWorksOrderItembyIdArgs

// api return types
export type GetWorksOrderItemsReturn = Promise<WorksOrderItemModelPagedResult | UserInputError>
export type GetWorksOrderItemByIdReturn = Promise<WorksOrderItemModel | UserInputError>
export type CreateWorksOrderItemReturn = GetWorksOrderItemByIdReturn
export type UpdateWorksOrderItemReturn = GetWorksOrderItemByIdReturn

export type GetWorksOrdersReturn = Promise<WorksOrderModelPagedResult | UserInputError>
export type GetWorksOrderByIdReturn = Promise<WorksOrderModel | UserInputError>
export type CreateWorksOrderReturn = GetWorksOrderByIdReturn
export type UpdateWorksOrderReturn = GetWorksOrderByIdReturn
export type DeleteWorksOrderItemReturn = Promise<boolean | UserInputError>

// resolver return types

export type QueryGetWorksOrderItemsReturn = AuthenticationError | GetWorksOrderItemsReturn
export type QueryGetWorksOrderItemByIdReturn = AuthenticationError | GetWorksOrderItemByIdReturn
export type MutationCreateWorksOrderItemReturn = AuthenticationError | CreateWorksOrderItemReturn
export type MutationUpdateWorksOrderItemReturn = AuthenticationError | UpdateWorksOrderItemArgs
export type MutationDeleteWorksOrderItemReturn = AuthenticationError | DeleteWorksOrderItemReturn

export type QueryGetWorksOrdersReturn = AuthenticationError | GetWorksOrdersReturn
export type QueryGetWorksOrdersByIdReturn = AuthenticationError | GetWorksOrderByIdReturn
export type MutationCreateWorksOrder = QueryGetWorksOrdersByIdReturn
export type MutationUpdateWorksOrder = QueryGetWorksOrdersByIdReturn
