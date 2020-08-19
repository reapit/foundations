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
} from './works-orders'
import { ServerContext } from '@/index'
import { checkPermission } from '@/utils/check-permission'
import errors from '@/errors'
import * as worksOrdersServices from './services'

export const mutationUpdateWorksOrderItem = (
  _: any,

  args: UpdateWorksOrderItemArgs,
  context: ServerContext,
): MutationUpdateWorksOrder => {
  const traceId = context.traceId

  logger.info('mutationUpdateWorksOrderItem', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }

  return worksOrdersServices.updateWorksOrderItem(args, context)
}

export const mutationCreateWorksOrderItem = (
  _: any,

  args: CreateWorksOrderItemArgs,
  context: ServerContext,
): MutationUpdateWorksOrder => {
  const traceId = context.traceId

  logger.info('mutationCreateWorksOrderItem', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }

  return worksOrdersServices.createWorksOrderItem(args, context)
}

export const queryGetWorksOrderById = (
  _: any,
  args: GetWorksOrderItembyIdArgs,
  context: ServerContext,
): QueryGetWorksOrderItemByIdReturn => {
  const traceId = context.traceId

  logger.info('queryGetWorksOrderById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }

  return worksOrdersServices.getWorksOrderItemById(args, context)
}

export const queryGetWorksOrderItems = (
  _: any,
  args: GetWorksOrderItemsArgs,
  context: ServerContext,
): QueryGetWorksOrderItemsReturn => {
  const traceId = context.traceId
  logger.info('queryGetWorksOrder', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return worksOrdersServices.getWorksOrderItems(args, context)
}

export const mutationUpdateWorksOrder = (
  _: any,
  args: UpdateWorksOrderArgs,
  context: ServerContext,
): MutationUpdateWorksOrder => {
  const traceId = context.traceId
  logger.info('queryGetWorksOrder', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return worksOrdersServices.updateWorksOrder(args, context)
}

export const queryGetWorksOrder = (
  _: any,
  args: GetWorksOrdersArgs,
  context: ServerContext,
): QueryGetWorksOrdersReturn => {
  const traceId = context.traceId
  logger.info('queryGetWorksOrder', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return worksOrdersServices.getWorksOrders(args, context)
}

export const queryGetWorksOrdersById = (
  _: any,
  args: GetWorksOrdersByIdArgs,
  context: ServerContext,
): QueryGetWorksOrdersByIdReturn => {
  const traceId = context.traceId

  logger.info('queryGetWorksOrdersById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }

  return worksOrdersServices.getWorkOrderById(args, context)
}

export const mutationCreateWorksOrder = (
  _: any,
  args: CreateWorksOrderArgs,
  context: ServerContext,
): QueryGetWorksOrdersByIdReturn => {
  const traceId = context.traceId

  logger.info('mutationCreateWorksOrder', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }

  return worksOrdersServices.createWorksOrder(args, context)
}

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
  },
}
