import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { DesktopIntegrationTypeModelPagedResult } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/utils-common'
import { URLS } from './constants'
import { FetchListCommonParams } from './types'
import { reapitConnectBrowserSession } from '../core/connect-session'

export type FetchDesktopIntegrationTypesParams = FetchListCommonParams

export const fetchDesktopIntegrationTypesApi = async (
  params: FetchDesktopIntegrationTypesParams,
): Promise<DesktopIntegrationTypeModelPagedResult | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.desktopIntegrationTypes}?${setQueryParams(params)}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw error?.response
  }
}
