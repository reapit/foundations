import configurationService from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../app'
import {
  QueryConfigurationByTypeAndIdReturn,
  QueryConfigurationsByTypeReturn,
  GetConfigurationByTypeAndIdArgs,
  GetConfigurationByTypeArgs,
} from './configurations'

export const queryGetConfigurationsByType = (
  _: any,
  args: GetConfigurationByTypeArgs,
  context: ServerContext,
): QueryConfigurationsByTypeReturn => {
  const traceId = context.traceId
  logger.info('queryGetConfigurationsByType', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return configurationService.getConfigurationsByType(args, context)
}

export const queryGetConfigurationsByTypeAndId = (
  _: any,
  args: GetConfigurationByTypeAndIdArgs,
  context: ServerContext,
): QueryConfigurationByTypeAndIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetConfigurationsByTypeAndId', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return configurationService.getConfigurationByTypeAndId(args, context)
}

export default {
  Query: {
    GetConfigurationsByType: queryGetConfigurationsByType,
    GetConfigurationByTypeAndId: queryGetConfigurationsByTypeAndId,
  },
}
