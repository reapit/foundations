import areaServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../app'
import {
  GetAreaByIdArgs,
  QueryAreaReturn,
  GetAreasArgs,
  QueryAreasReturn,
  CreateAreaArgs,
  MutationCreateAreaReturn,
  UpdateAreaArgs,
  MutationUpdateAreaReturn,
} from './area'

export const queryArea = (_: any, args: GetAreaByIdArgs, context: ServerContext): QueryAreaReturn => {
  const traceId = context.traceId
  logger.info('queryArea', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return areaServices.getAreaById(args, context)
}

export const queryAreas = (_: any, args: GetAreasArgs, context: ServerContext): QueryAreasReturn => {
  const traceId = context.traceId
  logger.info('areas', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return areaServices.getAreas(args, context)
}

export const mutationCreateArea = (_: any, args: CreateAreaArgs, context: ServerContext): MutationCreateAreaReturn => {
  const traceId = context.traceId
  logger.info('createArea', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return areaServices.createArea(args, context)
}

export const mutationUpdateArea = (_: any, args: UpdateAreaArgs, context: ServerContext): MutationUpdateAreaReturn => {
  const traceId = context.traceId
  logger.info('createArea', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return areaServices.updateArea(args, context)
}
