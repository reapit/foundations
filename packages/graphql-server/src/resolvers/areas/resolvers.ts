import areaServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../app'
import {
  GetAreaByIdArgs,
  CreateAreaArgs,
  GetAreasArgs,
  UpdateAreaArgs,
  QueryGetAreaByIdReturn,
  QueryGetAreasReturn,
  MutationCreateAreaReturn,
  MutationUpdateAreaReturn,
} from './areas'

export const queryGetAreaById = (_: any, args: GetAreaByIdArgs, context: ServerContext): QueryGetAreaByIdReturn => {
  const traceId = context.traceId
  logger.info('queryArea', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return areaServices.getAreaById(args, context)
}

export const queryGetAreas = (_: any, args: GetAreasArgs, context: ServerContext): QueryGetAreasReturn => {
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
  logger.info('updateArea', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return areaServices.updateArea(args, context)
}

export default {
  Query: {
    GetAreaById: queryGetAreaById,
    GetAreas: queryGetAreas,
  },
  Mutation: {
    CreateArea: mutationCreateArea,
    UpdateArea: mutationUpdateArea,
  },
}
