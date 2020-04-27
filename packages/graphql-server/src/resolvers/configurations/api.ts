import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  GetConfigurationByTypeAndIdReturn,
  GetConfigurationsByTypeReturn,
  GetConfigurationByTypeAndIdArgs,
  GetConfigurationByTypeArgs,
} from './configurations'
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'

export const callGetConfigurationsByTypeAndIdApi = async (
  { id, type }: GetConfigurationByTypeAndIdArgs,
  context: ServerContext,
): GetConfigurationByTypeAndIdReturn => {
  const traceId = context.traceId
  logger.info('callGetConfigurationsByTypeAndIdApi', { traceId })
  try {
    const response = await createPlatformAxiosInstance().get<GetConfigurationByTypeAndIdReturn>(
      `${URLS.configurations}/${type}/${id}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    return handleError({ error, traceId, caller: 'callGetConfigurationsByTypeAndIdApi' })
  }
}

export const callGetConfigurationsByTypeApi = async (
  { type }: GetConfigurationByTypeArgs,
  context: ServerContext,
): GetConfigurationsByTypeReturn => {
  const traceId = context.traceId
  logger.info('callGetConfigurationsByTypeApi', { traceId })
  try {
    const response = await createPlatformAxiosInstance().get<GetConfigurationsByTypeReturn>(
      `${URLS.configurations}/${type}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    return handleError({ error, traceId, caller: 'callGetConfigurationsByTypeApi' })
  }
}
