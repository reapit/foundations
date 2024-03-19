import {
  GetWorksOrdersArgs,
  QueryGetWorksOrdersReturn,
  GetWorksOrdersByIdArgs,
  QueryGetWorksOrdersByIdReturn,
  CreateWorksOrderArgs,
  UpdateWorksOrderArgs,
  MutationUpdateWorksOrder,
  QueryGetWorksOrderItemsReturn,
  GetWorksOrderItemsArgs,
  QueryGetWorksOrderItemByIdReturn,
  GetWorksOrderItembyIdArgs,
  CreateWorksOrderItemArgs,
  UpdateWorksOrderItemArgs,
  DeleteWorksOrderItemArgs,
  MutationDeleteWorksOrderItemReturn,
} from './works-orders'
import { resolverHandler, ServerContext } from '../../utils'
import * as worksOrdersServices from './services'

export const mutationdeleteWorksOrderItem = resolverHandler<
  DeleteWorksOrderItemArgs,
  MutationDeleteWorksOrderItemReturn
>((_: any, args: DeleteWorksOrderItemArgs, context: ServerContext): MutationDeleteWorksOrderItemReturn => {
  return worksOrdersServices.deleteWorksOrderItem(args, context)
})

export const mutationUpdateWorksOrderItem = resolverHandler<UpdateWorksOrderItemArgs, MutationUpdateWorksOrder>(
  (_: any, args: UpdateWorksOrderItemArgs, context: ServerContext): MutationUpdateWorksOrder => {
    return worksOrdersServices.updateWorksOrderItem(args, context)
  },
)

export const mutationCreateWorksOrderItem = resolverHandler<CreateWorksOrderItemArgs, MutationUpdateWorksOrder>(
  (_: any, args: CreateWorksOrderItemArgs, context: ServerContext): MutationUpdateWorksOrder => {
    return worksOrdersServices.createWorksOrderItem(args, context)
  },
)

export const queryGetWorksOrderById = resolverHandler<GetWorksOrderItembyIdArgs, QueryGetWorksOrderItemByIdReturn>(
  (_: any, args: GetWorksOrderItembyIdArgs, context: ServerContext): QueryGetWorksOrderItemByIdReturn => {
    return worksOrdersServices.getWorksOrderItemById(args, context)
  },
)

export const queryGetWorksOrderItems = resolverHandler<GetWorksOrderItemsArgs, QueryGetWorksOrderItemsReturn>(
  (_: any, args: GetWorksOrderItemsArgs, context: ServerContext): QueryGetWorksOrderItemsReturn => {
    return worksOrdersServices.getWorksOrderItems(args, context)
  },
)

export const mutationUpdateWorksOrder = resolverHandler<UpdateWorksOrderArgs, MutationUpdateWorksOrder>(
  (_: any, args: UpdateWorksOrderArgs, context: ServerContext): MutationUpdateWorksOrder => {
    return worksOrdersServices.updateWorksOrder(args, context)
  },
)

export const queryGetWorksOrder = resolverHandler<GetWorksOrdersArgs, QueryGetWorksOrdersReturn>(
  (_: any, args: GetWorksOrdersArgs, context: ServerContext): QueryGetWorksOrdersReturn => {
    return worksOrdersServices.getWorksOrders(args, context)
  },
)

export const queryGetWorksOrdersById = resolverHandler<GetWorksOrdersByIdArgs, QueryGetWorksOrdersByIdReturn>(
  (_: any, args: GetWorksOrdersByIdArgs, context: ServerContext): QueryGetWorksOrdersByIdReturn => {
    return worksOrdersServices.getWorkOrderById(args, context)
  },
)

export const mutationCreateWorksOrder = resolverHandler<CreateWorksOrderArgs, QueryGetWorksOrdersByIdReturn>(
  (_: any, args: CreateWorksOrderArgs, context: ServerContext): QueryGetWorksOrdersByIdReturn => {
    return worksOrdersServices.createWorksOrder(args, context)
  },
)

export default {
  Query: {
    GetWorksOrders: queryGetWorksOrder,
    GetWorksOrdersById: queryGetWorksOrdersById,
    GetWorksOrderItems: queryGetWorksOrderItems,
    GetWorksOrderItemById: queryGetWorksOrderById,
  },
  Mutation: {
    CreateWorksOrder: mutationCreateWorksOrder,
    UpdateWorksOrder: mutationUpdateWorksOrder,
    CreateWorksOrderItem: mutationCreateWorksOrderItem,
    UpdateWorksOrderItem: mutationUpdateWorksOrderItem,
    DeleteWorksOrderItem: mutationdeleteWorksOrderItem,
  },
}
