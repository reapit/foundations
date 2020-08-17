import logger from '../../logger'

import {
  GetWorksOrdersArgs,
  QueryGetWorksOrdersReturn,
  GetWorksOrdersByIdArgs,
  QueryGetWorksOrdersByIdReturn,
  CreateWorksOrderArgs,
} from './works-orders'
import { ServerContext } from '@/index'
import { checkPermission } from '@/utils/check-permission'
import errors from '@/errors'
import * as worksOrdersServices from './services'

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
  },
  Mutation: {
    CreateWorksOrder: mutationCreateWorksOrder,
  },
}
