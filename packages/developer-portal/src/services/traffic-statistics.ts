import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeader } from './utils'
import { logger } from '@reapit/utils'

export type EndpointStatisticsModel = {
  endpoint?: string
  requestCount?: number
}

export type DateStatisticsModel = {
  date?: string
  requestCount?: number
}

export type CustomerStatisticsModel = {
  customerId?: string
  requestCount?: number
}

export type FetchTrafficStatisticsParams = {
  applicationId?: string[]
  customerId?: string[]
  dateFrom?: string
  dateTo?: string
}

export type TrafficEventsStatisticsSummaryModel = {
  from?: string
  to?: string
  totalRequestCount?: number
  totalEndpointCount?: number
  requestsByEndpoint?: EndpointStatisticsModel[]
  requestsByDate?: DateStatisticsModel[]
  requestsByCustomer?: CustomerStatisticsModel[]
}

export const fetchTrafficStatistics = async (
  params: FetchTrafficStatisticsParams,
): Promise<TrafficEventsStatisticsSummaryModel> => {
  const api =
    window.reapit.config.appEnv === 'production'
      ? window.reapit.config.platformApiUrl
      : window.reapit.config.marketplaceApiUrl
  try {
    const response = await fetcher({
      url: `${URLS.trafficEventStatistics}?${setQueryParams(params)}`,
      api,
      method: 'GET',
      headers: await generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
