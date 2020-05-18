import { UsageStatsModel } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeader } from './utils'
import { logger } from 'logger'

export type FetchStatisticsListParams = {
  appId?: string[]
  dateFrom?: string
  dateTo?: string
}

export const fetchStatisticsList = async (params: FetchStatisticsListParams): Promise<UsageStatsModel> => {
  try {
    const response = await fetcher({
      url: `${URLS.statistics}?${setQueryParams(params)}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
