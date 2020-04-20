import propertyTypeService from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../app'
import { QueryPropertyTypesReturn } from './property-types'

export const queryPropertyTypes = (_: any, args: any, context: ServerContext): QueryPropertyTypesReturn => {
  const traceId = context.traceId
  logger.info('queryPropertyTypes', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyTypeService.getPropertyTypes(args, context)
}

export default {
  Query: {
    GetPropertyTypes: queryPropertyTypes,
  },
}
