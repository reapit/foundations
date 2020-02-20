import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  GetAreaByIdArgs,
  GetAreasArgs,
  GetAreaByIdReturn,
  GetAreasReturn,
  CreateAreaArgs,
  CreateAreaReturn,
  UpdateAreaArgs,
  UpdateAreaReturn,
} from './area'
import { callGetAreasAPI, callCreateAreaAPI, callGetAreaByIdAPI, callUpdateArea } from './api'

export const getAreaById = (args: GetAreaByIdArgs, context: ServerContext): GetAreaByIdReturn => {
  const traceId = context.traceId
  logger.info('getAreaById', { traceId, args })
  const area = callGetAreaByIdAPI(args, context)
  return area
}

export const getAreas = (args: GetAreasArgs, context: ServerContext): GetAreasReturn => {
  const traceId = context.traceId
  logger.info('getAreas', { traceId, args })
  const areas = callGetAreasAPI(args, context)
  return areas
}

export const createArea = (args: CreateAreaArgs, context: ServerContext): CreateAreaReturn => {
  const traceId = context.traceId
  logger.info('createArea', { traceId, args })
  const createResult = callCreateAreaAPI(args, context)
  return createResult
}

export const updateArea = (args: UpdateAreaArgs, context: ServerContext): UpdateAreaReturn => {
  const traceId = context.traceId
  logger.info('updateArea', { traceId, args })
  const updateResult = callUpdateArea(args, context)
  return updateResult
}

const areaServices = {
  getAreaById,
  getAreas,
  createArea,
  updateArea,
}

export default areaServices
