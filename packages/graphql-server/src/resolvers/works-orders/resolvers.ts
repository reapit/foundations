import logger from '../../logger'
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
import { resolverHandler, ServerContext } from '@/utils'
import * as worksOrdersServices from './services'

export const mutationdeleteWorksOrderItem = resolverHandler<DeleteWorksOrderItemArgs, MutationDeleteWorksOrderItemReturn>((
  _: any,
  args: DeleteWorksOrderItemArgs,
  context: ServerContext,
): MutationDeleteWorksOrderItemReturn => {
  const traceId = context.traceId

  logger.info('mutationdeleteWorksOrderItem', { traceId, args })
  return worksOrdersServices.deleteWorksOrderItem(args, context)
})

export const mutationUpdateWorksOrderItem = resolverHandler<UpdateWorksOrderItemArgs, MutationUpdateWorksOrder>((
  _: any,
  args: UpdateWorksOrderItemArgs,
  context: ServerContext,
): MutationUpdateWorksOrder => {
  const traceId = context.traceId

  logger.info('mutationUpdateWorksOrderItem', { traceId, args })
  return worksOrdersServices.updateWorksOrderItem(args, context)
})

export const mutationCreateWorksOrderItem = resolverHandler<CreateWorksOrderItemArgs, MutationUpdateWorksOrder>((
  _: any,
  args: CreateWorksOrderItemArgs,
  context: ServerContext,
): MutationUpdateWorksOrder => {
  const traceId = context.traceId
  logger.info('mutationCreateWorksOrderItem', { traceId, args })
  return worksOrdersServices.createWorksOrderItem(args, context)
})

export const queryGetWorksOrderById = resolverHandler<GetWorksOrderItembyIdArgs, QueryGetWorksOrderItemByIdReturn>((
  _: any,
  args: GetWorksOrderItembyIdArgs,
  context: ServerContext,
): QueryGetWorksOrderItemByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetWorksOrderById', { traceId, args })

  return worksOrdersServices.getWorksOrderItemById(args, context)
})

export const queryGetWorksOrderItems = resolverHandler<GetWorksOrderItemsArgs, QueryGetWorksOrderItemsReturn>((
  _: any,
  args: GetWorksOrderItemsArgs,
  context: ServerContext,
): QueryGetWorksOrderItemsReturn => {
  const traceId = context.traceId
  logger.info('queryGetWorksOrder', { traceId, args })
  return worksOrdersServices.getWorksOrderItems(args, context)
})

export const mutationUpdateWorksOrder = resolverHandler<UpdateWorksOrderArgs, MutationUpdateWorksOrder>((
  _: any,
  args: UpdateWorksOrderArgs,
  context: ServerContext,
): MutationUpdateWorksOrder => {
  const traceId = context.traceId
  logger.info('queryGetWorksOrder', { traceId, args })

  return worksOrdersServices.updateWorksOrder(args, context)
})

export const queryGetWorksOrder = resolverHandler<GetWorksOrdersArgs, QueryGetWorksOrdersReturn>((
  _: any,
  args: GetWorksOrdersArgs,
  context: ServerContext,
): QueryGetWorksOrdersReturn => {
  const traceId = context.traceId
  logger.info('queryGetWorksOrder', { traceId, args })
  return worksOrdersServices.getWorksOrders(args, context)
})

export const queryGetWorksOrdersById = resolverHandler<GetWorksOrdersByIdArgs, QueryGetWorksOrdersByIdReturn>((
  _: any,
  args: GetWorksOrdersByIdArgs,
  context: ServerContext,
): QueryGetWorksOrdersByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetWorksOrdersById', { traceId, args })

  return worksOrdersServices.getWorkOrderById(args, context)
})

export const mutationCreateWorksOrder = resolverHandler<CreateWorksOrderArgs, QueryGetWorksOrdersByIdReturn>((
  _: any,
  args: CreateWorksOrderArgs,
  context: ServerContext,
): QueryGetWorksOrdersByIdReturn => {
  const traceId = context.traceId

  logger.info('mutationCreateWorksOrder', { traceId, args })

  return worksOrdersServices.createWorksOrder(args, context)
})

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
