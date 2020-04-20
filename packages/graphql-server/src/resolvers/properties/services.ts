import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  GetPropertyByIdArgs,
  CreatePropertyArgs,
  UpdatePropertyArgs,
  GetPropertiesArgs,
  GetPropertyByIdReturn,
  GetPropertiesReturn,
  CreatePropertyReturn,
  UpdatePropertyReturn,
} from './properties'
import { callGetPropertyByIdAPI, callGetPropertiesAPI, callCreatePropertyAPI, callUpdatePropertyAPI } from './api'

export const getPropertyById = (args: GetPropertyByIdArgs, context: ServerContext): GetPropertyByIdReturn => {
  const traceId = context.traceId
  logger.info('getPropertyById', { traceId, args })
  const property = callGetPropertyByIdAPI(args, context)
  return property
}

export const getProperties = (args: GetPropertiesArgs, context: ServerContext): GetPropertiesReturn => {
  const traceId = context.traceId
  logger.info('getProperties', { traceId, args })
  const properties = callGetPropertiesAPI(args, context)
  return properties
}

export const createProperty = (args: CreatePropertyArgs, context: ServerContext): CreatePropertyReturn => {
  const traceId = context.traceId
  logger.info('createProperty', { traceId, args })
  const createResult = callCreatePropertyAPI(args, context)
  return createResult
}

export const updateProperty = (args: UpdatePropertyArgs, context: ServerContext): UpdatePropertyReturn => {
  const traceId = context.traceId
  logger.info('updateProperty', { traceId, args })
  const updateResult = callUpdatePropertyAPI({ ...args }, context)
  return updateResult
}

const propertyServices = {
  getPropertyById,
  getProperties,
  createProperty,
  updateProperty,
}

export default propertyServices
