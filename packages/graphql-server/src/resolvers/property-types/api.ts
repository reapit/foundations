import logger from '../../logger'
import { ServerContext } from '../../app'
import { GetPropertyTypesReturn } from './property-types'
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'

export const callGetPropertyTypesByIdAPI = async (_, context: ServerContext): GetPropertyTypesReturn => {
  const traceId = context.traceId
  logger.info('callGetPropertyTypesByIdAPI', { traceId })
  try {
    const response = await createPlatformAxiosInstance().get<GetPropertyTypesReturn>(`${URLS.propertyTypes}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    return handleError({ error, traceId, caller: 'callGetOfficeByIdAPI' })
  }
}
