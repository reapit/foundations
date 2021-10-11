import { fetcher, setQueryParams } from '@reapit/utils-common'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../core/connect-session'

export type FetchStatisticsListParams = {
  appId?: string[]
  dateFrom?: string
  dateTo?: string
}

// UsageStatsModel is deprecated
// this endpoint is obsolete
// TODO: investigate, remove this code
export const fetchStatisticsList = async (params: FetchStatisticsListParams): Promise<any> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response = await fetcher({
        url: `${URLS.statistics}?${setQueryParams(params)}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      return response
    }
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
