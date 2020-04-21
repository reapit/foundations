import propertyServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../app'
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

export const queryGetPropertyById = (
  _: any,
  args: GetPropertyByIdArgs,
  context: ServerContext,
): QueryGetPropertyByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetPropertyById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.getPropertyById(args, context)
}

export const queryGetProperties = (
  _: any,
  args: GetPropertiesArgs,
  context: ServerContext,
): QueryGetPropertiesReturn => {
  const traceId = context.traceId
  logger.info('queryGetProperties', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.getProperties(args, context)
}

export const mutationCreateProperty = (
  _: any,
  args: CreatePropertyArgs,
  context: ServerContext,
): MutationCreatePropertyReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateProperty', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.createProperty(args, context)
}

export const mutationUpdateProperty = (
  _: any,
  args: UpdatePropertyArgs,
  context: ServerContext,
): MutationUpdatePropertyReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateProperty', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.updateProperty(args, context)
}

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
