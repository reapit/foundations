import propertyServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../index'
import {
  GetPropertyImageByIdArgs,
  CreatePropertyImageArgs,
  GetPropertyImagesArgs,
  UpdatePropertyImageArgs,
  QueryGetPropertyImageByIdReturn,
  QueryGetPropertyImagesReturn,
  MutationCreatePropertyImageReturn,
  MutationUpdatePropertyImageReturn,
  DeletePropertyImageArgs,
  MutationDeletePropertyImageReturn,
} from './propertyImages'

export const queryGetPropertyImageById = (
  _: any,
  args: GetPropertyImageByIdArgs,
  context: ServerContext,
): QueryGetPropertyImageByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetPropertyImageById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.getPropertyImageById(args, context)
}

export const queryGetPropertyImages = (
  _: any,
  args: GetPropertyImagesArgs,
  context: ServerContext,
): QueryGetPropertyImagesReturn => {
  const traceId = context.traceId
  logger.info('queryGetPropertyImages', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.getPropertyImages(args, context)
}

export const mutationCreatePropertyImage = (
  _: any,
  args: CreatePropertyImageArgs,
  context: ServerContext,
): MutationCreatePropertyImageReturn => {
  const traceId = context.traceId
  logger.info('mutationCreatePropertyImage', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.createPropertyImage(args, context)
}

export const mutationUpdatePropertyImage = (
  _: any,
  args: UpdatePropertyImageArgs,
  context: ServerContext,
): MutationUpdatePropertyImageReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdatePropertyImage', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.updatePropertyImage(args, context)
}

export const mutationDeletePropertyImage = (
  _: any,
  args: DeletePropertyImageArgs,
  context: ServerContext,
): MutationDeletePropertyImageReturn => {
  const traceId = context.traceId
  logger.info('mutationDeletePropertyImage', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.deletePropertyImage(args, context)
}

export default {
  Query: {
    GetPropertyImageById: queryGetPropertyImageById,
    GetPropertyImages: queryGetPropertyImages,
  },
  Mutation: {
    CreatePropertyImage: mutationCreatePropertyImage,
    UpdatePropertyImage: mutationUpdatePropertyImage,
    DeletePropertyImage: mutationDeletePropertyImage,
  },
}
