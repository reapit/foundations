import propertyServices from './services'
import { resolverHandler, ServerContext } from '../../utils'
import {
  GetPropertyByIdArgs,
  CreatePropertyArgs,
  GetPropertiesArgs,
  UpdatePropertyArgs,
  QueryGetPropertyByIdReturn,
  QueryGetPropertiesReturn,
  MutationCreatePropertyReturn,
  MutationUpdatePropertyReturn,
} from './properties'

export const queryGetPropertyById = resolverHandler<GetPropertyByIdArgs, QueryGetPropertyByIdReturn>(
  (_: any, args: GetPropertyByIdArgs, context: ServerContext): QueryGetPropertyByIdReturn => {
    return propertyServices.getPropertyById(args, context)
  },
)

export const queryGetProperties = resolverHandler<GetPropertiesArgs, QueryGetPropertiesReturn>(
  (_: any, args: GetPropertiesArgs, context: ServerContext): QueryGetPropertiesReturn => {
    return propertyServices.getProperties(args, context)
  },
)

export const mutationCreateProperty = resolverHandler<CreatePropertyArgs, MutationCreatePropertyReturn>(
  (_: any, args: CreatePropertyArgs, context: ServerContext): MutationCreatePropertyReturn => {
    return propertyServices.createProperty(args, context)
  },
)

export const mutationUpdateProperty = resolverHandler<UpdatePropertyArgs, MutationUpdatePropertyReturn>(
  (_: any, args: UpdatePropertyArgs, context: ServerContext): MutationUpdatePropertyReturn => {
    return propertyServices.updateProperty(args, context)
  },
)

export default {
  Query: {
    GetPropertyById: queryGetPropertyById,
    GetProperties: queryGetProperties,
  },
  Mutation: {
    CreateProperty: mutationCreateProperty,
    UpdateProperty: mutationUpdateProperty,
  },
}
