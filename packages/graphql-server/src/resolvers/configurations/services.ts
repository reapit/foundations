import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  GetConfigurationByTypeAndIdReturn,
  GetConfigurationsByTypeReturn,
  GetConfigurationByTypeAndIdArgs,
  GetConfigurationByTypeArgs,
} from './configurations'
import { callGetConfigurationsByTypeApi, callGetConfigurationsByTypeAndIdApi } from './api'

export const getConfigurationByTypeAndId = (
  args: GetConfigurationByTypeAndIdArgs,
  context: ServerContext,
): GetConfigurationByTypeAndIdReturn => {
  const traceId = context.traceId
  logger.info('getConfigurationByTypeAndId', { traceId })
  const configurations = callGetConfigurationsByTypeAndIdApi(args, context)
  return configurations
}

export const getConfigurationsByType = (
  args: GetConfigurationByTypeArgs,
  context: ServerContext,
): GetConfigurationsByTypeReturn => {
  const traceId = context.traceId
  logger.info('getConfigurationsByType', { traceId })
  const configuration = callGetConfigurationsByTypeApi(args, context)
  return configuration
}

const propertyTypeService = {
  getConfigurationByTypeAndId,
  getConfigurationsByType,
}

export default propertyTypeService
