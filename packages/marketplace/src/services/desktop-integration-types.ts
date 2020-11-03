import { logger } from '@reapit/utils'
import { DesktopIntegrationTypeModelPagedResult } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeaders } from './utils'
import { FetchListCommonParams } from './types'

export type FetchDesktopIntegrationTypesParams = FetchListCommonParams

export const fetchDesktopIntegrationTypesApi = async (
  params: FetchDesktopIntegrationTypesParams,
): Promise<DesktopIntegrationTypeModelPagedResult> => {
  try {
    const response = await fetcher({
      url: `${URLS.desktopIntegrationTypes}?${setQueryParams(params)}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await generateHeaders(),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}
