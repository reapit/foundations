import configurationService from './services'
import logger from '../../logger'
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
>(
  (_: any, args: GetConfigurationByTypeArgs, context: ServerContext): QueryConfigurationsByTypeReturn => {
    const traceId = context.traceId
    logger.info('queryGetConfigurationsByType', { traceId, args })
    return configurationService.getConfigurationsByType(args, context)
  },
)

export const queryGetConfigurationsByTypeAndId = resolverHandler<
  GetConfigurationByTypeAndIdArgs,
  QueryConfigurationByTypeAndIdReturn
>(
  (_: any, args: GetConfigurationByTypeAndIdArgs, context: ServerContext): QueryConfigurationByTypeAndIdReturn => {
    const traceId = context.traceId
    logger.info('queryGetConfigurationsByTypeAndId', { traceId, args })
    return configurationService.getConfigurationByTypeAndId(args, context)
  },
)

export default {
  Query: {
    GetConfigurationsByType: queryGetConfigurationsByType,
    GetConfigurationByTypeAndId: queryGetConfigurationsByTypeAndId,
  },
}
