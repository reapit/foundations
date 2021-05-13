import propertyServices from './services'
import logger from '../../logger'
import { resolverHandler, ServerContext } from '../../utils'
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

export const queryGetPropertyImageById = resolverHandler<GetPropertyImageByIdArgs, QueryGetPropertyImageByIdReturn>((
  _: any,
  args: GetPropertyImageByIdArgs,
  context: ServerContext,
): QueryGetPropertyImageByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetPropertyImageById', { traceId, args })
  return propertyServices.getPropertyImageById(args, context)
})

export const queryGetPropertyImages = resolverHandler<GetPropertyImagesArgs, QueryGetPropertyImagesReturn>((
  _: any,
  args: GetPropertyImagesArgs,
  context: ServerContext,
): QueryGetPropertyImagesReturn => {
  const traceId = context.traceId
  logger.info('queryGetPropertyImages', { traceId, args })
  return propertyServices.getPropertyImages(args, context)
})

export const mutationCreatePropertyImage = resolverHandler<CreatePropertyImageArgs, MutationCreatePropertyImageReturn>((
  _: any,
  args: CreatePropertyImageArgs,
  context: ServerContext,
): MutationCreatePropertyImageReturn => {
  const traceId = context.traceId
  logger.info('mutationCreatePropertyImage', { traceId, args })

  return propertyServices.createPropertyImage(args, context)
})

export const mutationUpdatePropertyImage = resolverHandler<UpdatePropertyImageArgs, MutationUpdatePropertyImageReturn>((
  _: any,
  args: UpdatePropertyImageArgs,
  context: ServerContext,
): MutationUpdatePropertyImageReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdatePropertyImage', { traceId, args })
  return propertyServices.updatePropertyImage(args, context)
})

export const mutationDeletePropertyImage = resolverHandler<DeletePropertyImageArgs, MutationDeletePropertyImageReturn>((
  _: any,
  args: DeletePropertyImageArgs,
  context: ServerContext,
): MutationDeletePropertyImageReturn => {
  const traceId = context.traceId
  logger.info('mutationDeletePropertyImage', { traceId, args })
  return propertyServices.deletePropertyImage(args, context)
})

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
