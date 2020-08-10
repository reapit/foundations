import logger from '../../logger'
import { ServerContext } from '../../index'
import {
  GetPropertyImageByIdArgs,
  CreatePropertyImageArgs,
  UpdatePropertyImageArgs,
  GetPropertyImagesArgs,
  GetPropertyImageByIdReturn,
  GetPropertyImagesReturn,
  CreatePropertyImageReturn,
  UpdatePropertyImageReturn,
} from './propertyImages'
import {
  callGetPropertyImageByIdAPI,
  callGetPropertyImagesAPI,
  callCreatePropertyImageAPI,
  callUpdatePropertyImageAPI,
} from './api'

export const getPropertyImageById = (
  args: GetPropertyImageByIdArgs,
  context: ServerContext,
): GetPropertyImageByIdReturn => {
  const traceId = context.traceId
  logger.info('getPropertyImageById', { traceId, args })
  const property = callGetPropertyImageByIdAPI(args, context)
  return property
}

export const getPropertyImages = (args: GetPropertyImagesArgs, context: ServerContext): GetPropertyImagesReturn => {
  const traceId = context.traceId
  logger.info('getPropertyImages', { traceId, args })
  const propertyImages = callGetPropertyImagesAPI(args, context)
  return propertyImages
}

export const createPropertyImage = (
  args: CreatePropertyImageArgs,
  context: ServerContext,
): CreatePropertyImageReturn => {
  const traceId = context.traceId
  logger.info('createPropertyImage', { traceId, args })
  const createResult = callCreatePropertyImageAPI(args, context)
  return createResult
}

export const updatePropertyImage = (
  args: UpdatePropertyImageArgs,
  context: ServerContext,
): UpdatePropertyImageReturn => {
  const traceId = context.traceId
  logger.info('updatePropertyImage', { traceId, args })
  const updateResult = callUpdatePropertyImageAPI({ ...args }, context)
  return updateResult
}

const propertyServices = {
  getPropertyImageById,
  getPropertyImages,
  createPropertyImage,
  updatePropertyImage,
}

export default propertyServices
