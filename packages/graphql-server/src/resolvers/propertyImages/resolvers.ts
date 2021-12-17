import propertyServices from './services'
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

export const queryGetPropertyImageById = resolverHandler<GetPropertyImageByIdArgs, QueryGetPropertyImageByIdReturn>(
  (_: any, args: GetPropertyImageByIdArgs, context: ServerContext): QueryGetPropertyImageByIdReturn => {
    return propertyServices.getPropertyImageById(args, context)
  },
)

export const queryGetPropertyImages = resolverHandler<GetPropertyImagesArgs, QueryGetPropertyImagesReturn>(
  (_: any, args: GetPropertyImagesArgs, context: ServerContext): QueryGetPropertyImagesReturn => {
    return propertyServices.getPropertyImages(args, context)
  },
)

export const mutationCreatePropertyImage = resolverHandler<CreatePropertyImageArgs, MutationCreatePropertyImageReturn>(
  (_: any, args: CreatePropertyImageArgs, context: ServerContext): MutationCreatePropertyImageReturn => {

    return propertyServices.createPropertyImage(args, context)
  },
)

export const mutationUpdatePropertyImage = resolverHandler<UpdatePropertyImageArgs, MutationUpdatePropertyImageReturn>(
  (_: any, args: UpdatePropertyImageArgs, context: ServerContext): MutationUpdatePropertyImageReturn => {
    return propertyServices.updatePropertyImage(args, context)
  },
)

export const mutationDeletePropertyImage = resolverHandler<DeletePropertyImageArgs, MutationDeletePropertyImageReturn>(
  (_: any, args: DeletePropertyImageArgs, context: ServerContext): MutationDeletePropertyImageReturn => {
    return propertyServices.deletePropertyImage(args, context)
  },
)

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
