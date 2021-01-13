import { getPlatformHeaders, logger } from '@reapit/utils'
import { DesktopIntegrationTypeModelPagedResult } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { FetchListCommonParams } from './types'
import { reapitConnectBrowserSession } from '../core/connect-session'

export type FetchDesktopIntegrationTypesParams = FetchListCommonParams

export const fetchDesktopIntegrationTypesApi = async (
  params: FetchDesktopIntegrationTypesParams,
): Promise<DesktopIntegrationTypeModelPagedResult> => {
  try {
    const response = await fetcher({
      url: `${URLS.desktopIntegrationTypes}?${setQueryParams(params)}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}
