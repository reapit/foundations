import logger from '../../logger'
import { ServerContext } from '../../app'
import { GetPropertyTypesReturn } from './property-types'
import { callGetPropertyTypesByIdAPI } from './api'

export const getPropertyTypes = (_, context: ServerContext): GetPropertyTypesReturn => {
  const traceId = context.traceId
  logger.info('getPropertyTypes', { traceId })
  const propertyTypes = callGetPropertyTypesByIdAPI(_, context)
  return propertyTypes
}

const propertyTypeService = {
  getPropertyTypes,
}

export default propertyTypeService
