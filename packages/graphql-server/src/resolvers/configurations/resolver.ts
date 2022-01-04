import configurationService from './services'
import { resolverHandler, ServerContext } from '../../utils'
import {
  QueryConfigurationByTypeAndIdReturn,
  QueryConfigurationsByTypeReturn,
  GetConfigurationByTypeAndIdArgs,
  GetConfigurationByTypeArgs,
} from './configurations'

export const queryGetConfigurationsByType = resolverHandler<
  GetConfigurationByTypeArgs,
  QueryConfigurationsByTypeReturn
>((_: any, args: GetConfigurationByTypeArgs, context: ServerContext): QueryConfigurationsByTypeReturn => {
  return configurationService.getConfigurationsByType(args, context)
})

export const queryGetConfigurationsByTypeAndId = resolverHandler<
  GetConfigurationByTypeAndIdArgs,
  QueryConfigurationByTypeAndIdReturn
>((_: any, args: GetConfigurationByTypeAndIdArgs, context: ServerContext): QueryConfigurationByTypeAndIdReturn => {
  return configurationService.getConfigurationByTypeAndId(args, context)
})

export default {
  Query: {
    GetConfigurationsByType: queryGetConfigurationsByType,
    GetConfigurationByTypeAndId: queryGetConfigurationsByTypeAndId,
  },
}
