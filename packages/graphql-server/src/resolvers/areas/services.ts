import { ServerContext } from '../../utils'
import {
  GetAreaByIdArgs,
  CreateAreaArgs,
  UpdateAreaArgs,
  GetAreasArgs,
  GetAreaByIdReturn,
  GetAreasReturn,
  CreateAreaReturn,
  UpdateAreaReturn,
} from './areas'
import { callGetAreaByIdAPI, callGetAreasAPI, callCreateAreaAPI, callUpdateAreaAPI } from './api'

export const getAreaById = (args: GetAreaByIdArgs, context: ServerContext): GetAreaByIdReturn => {
  const area = callGetAreaByIdAPI(args, context)
  return area
}

export const getAreas = (args: GetAreasArgs, context: ServerContext): GetAreasReturn => {
  const areas = callGetAreasAPI(args, context)
  return areas
}

export const createArea = (args: CreateAreaArgs, context: ServerContext): CreateAreaReturn => {
  const createResult = callCreateAreaAPI(args, context)
  return createResult
}

export const updateArea = (args: UpdateAreaArgs, context: ServerContext): UpdateAreaReturn => {
  const updateResult = callUpdateAreaAPI({ ...args }, context)
  return updateResult
}

const areaServices = {
  getAreaById,
  getAreas,
  createArea,
  updateArea,
}

export default areaServices
