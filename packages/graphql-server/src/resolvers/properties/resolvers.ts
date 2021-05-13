import propertyServices from './services'
import logger from '../../logger'
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

export const queryGetPropertyById = resolverHandler<GetPropertyByIdArgs, QueryGetPropertyByIdReturn>((
  _: any,
  args: GetPropertyByIdArgs,
  context: ServerContext,
): QueryGetPropertyByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetPropertyById', { traceId, args })
  return propertyServices.getPropertyById(args, context)
})

export const queryGetProperties = resolverHandler<GetPropertiesArgs, QueryGetPropertiesReturn>((
  _: any,
  args: GetPropertiesArgs,
  context: ServerContext,
): QueryGetPropertiesReturn => {
  const traceId = context.traceId
  logger.info('queryGetProperties', { traceId, args })
  return propertyServices.getProperties(args, context)
})

export const mutationCreateProperty = resolverHandler<CreatePropertyArgs, MutationCreatePropertyReturn>((
  _: any,
  args: CreatePropertyArgs,
  context: ServerContext,
): MutationCreatePropertyReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateProperty', { traceId, args })
  return propertyServices.createProperty(args, context)
})

export const mutationUpdateProperty = resolverHandler<UpdatePropertyArgs, MutationUpdatePropertyReturn>((
  _: any,
  args: UpdatePropertyArgs,
  context: ServerContext,
): MutationUpdatePropertyReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateProperty', { traceId, args })
  return propertyServices.updateProperty(args, context)
})

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
