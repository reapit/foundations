import { ServerContext } from '../../utils'
import {
  GetPropertyImageByIdArgs,
  CreatePropertyImageArgs,
  UpdatePropertyImageArgs,
  GetPropertyImagesArgs,
  GetPropertyImageByIdReturn,
  GetPropertyImagesReturn,
  CreatePropertyImageReturn,
  UpdatePropertyImageReturn,
  DeletePropertyImageArgs,
  DeletePropertyImageReturn,
} from './propertyImages'
import {
  callGetPropertyImageByIdAPI,
  callGetPropertyImagesAPI,
  callCreatePropertyImageAPI,
  callUpdatePropertyImageAPI,
  callDeletePropertyImageAPI,
} from './api'

export const getPropertyImageById = (
  args: GetPropertyImageByIdArgs,
  context: ServerContext,
): GetPropertyImageByIdReturn => {
  const property = callGetPropertyImageByIdAPI(args, context)
  return property
}

export const getPropertyImages = (args: GetPropertyImagesArgs, context: ServerContext): GetPropertyImagesReturn => {
  const propertyImages = callGetPropertyImagesAPI(args, context)
  return propertyImages
}

export const createPropertyImage = (
  args: CreatePropertyImageArgs,
  context: ServerContext,
): CreatePropertyImageReturn => {
  const createResult = callCreatePropertyImageAPI(args, context)
  return createResult
}

export const updatePropertyImage = (
  args: UpdatePropertyImageArgs,
  context: ServerContext,
): UpdatePropertyImageReturn => {
  const updateResult = callUpdatePropertyImageAPI({ ...args }, context)
  return updateResult
}

export const deletePropertyImage = (
  args: DeletePropertyImageArgs,
  context: ServerContext,
): DeletePropertyImageReturn => {
  const deleteResult = callDeletePropertyImageAPI({ ...args }, context)
  return deleteResult
}

const propertyServices = {
  getPropertyImageById,
  getPropertyImages,
  createPropertyImage,
  updatePropertyImage,
  deletePropertyImage,
}

export default propertyServices
