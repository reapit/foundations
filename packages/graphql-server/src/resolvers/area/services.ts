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
} from './types'
import { callGetAreasAPI, callCreateAreaAPI, callGetAreaByIdAPI, callUpdateArea } from './api'

export const getAreaById = async (args: GetAreaByIdArgs, context: ServerContext): GetAreaByIdReturn => {
  const traceId = context.traceId
  logger.info('getAreaById', { traceId, args })
  const area = await callGetAreaByIdAPI(args, context)
  return area
}

export const getAreas = async (args: GetAreasArgs, context: ServerContext): GetAreasReturn => {
  const traceId = context.traceId
  logger.info('getAreas', { traceId, args })
  const areas = await callGetAreasAPI(args, context)
  return areas
}

export const createArea = async (args: CreateAreaArgs, context: ServerContext): CreateAreaReturn => {
  const traceId = context.traceId
  logger.info('createArea', { traceId, args })
  const createResult = await callCreateAreaAPI(args, context)
  return createResult
}

export const updateArea = async (args: UpdateAreaArgs, context: ServerContext): UpdateAreaReturn => {
  // Get eTag from current area
  const { _eTag } = await callGetAreaByIdAPI({ id: args.id }, context)
  const traceId = context.traceId
  logger.info('updateArea', { traceId, args })
  const updateResult = await callUpdateArea({ ...args, _eTag }, context)
  return updateResult
}

const areaServices = {
  getAreaById,
  getAreas,
  createArea,
  updateArea,
}

export default areaServices
