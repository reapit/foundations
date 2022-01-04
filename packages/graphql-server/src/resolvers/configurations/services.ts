import { ServerContext } from '../../utils'
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
  const configurations = callGetConfigurationsByTypeAndIdApi(args, context)
  return configurations
}

export const getConfigurationsByType = (
  args: GetConfigurationByTypeArgs,
  context: ServerContext,
): GetConfigurationsByTypeReturn => {
  const configuration = callGetConfigurationsByTypeApi(args, context)
  return configuration
}

const propertyTypeService = {
  getConfigurationByTypeAndId,
  getConfigurationsByType,
}

export default propertyTypeService
