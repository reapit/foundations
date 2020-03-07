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
  logger.info('queryGetAreaById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return areaServices.getAreaById(args, context)
}

export const queryGetAreas = (_: any, args: GetAreasArgs, context: ServerContext): QueryGetAreasReturn => {
  const traceId = context.traceId
  logger.info('queryGetAreas', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return areaServices.getAreas(args, context)
}

export const mutationCreateArea = (_: any, args: CreateAreaArgs, context: ServerContext): MutationCreateAreaReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateArea', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return areaServices.createArea(args, context)
}

export const mutationUpdateArea = (_: any, args: UpdateAreaArgs, context: ServerContext): MutationUpdateAreaReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateArea', { traceId, args })
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
