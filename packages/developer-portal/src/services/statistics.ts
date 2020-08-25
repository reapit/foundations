import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeader } from './utils'
import { logger } from '@reapit/utils'

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
    const response = await fetcher({
      url: `${URLS.statistics}?${setQueryParams(params)}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: await generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
