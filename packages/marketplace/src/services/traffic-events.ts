// import { BillingS } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeader } from './utils'
import { logger } from 'logger'

// Manual defined Model
export interface BillingSummaryModel {
  description?: string
  from?: string
  to?: string
  requestsByPeriod?: MonthlyBillingDetailsModel
}

export interface MonthlyBillingDetailsModel {
  period?: string
  periodStart?: string
  periodEnd?: string
  periodName?: string
  requestCount?: number
  endpointCount?: number
  netAmount?: number
  grossAmount?: number
  vatAmount?: number
}

export interface BillingDetailsModel {
  period?: string
  totalEndpoints?: number
  totalRequests?: number
  totalCost?: number
  requestsByService?: ServiceBillingDetailsModel[]
}

export interface ServiceBillingDetailsModel {
  serviceName?: string
  endpointCount?: number
  requestCount?: number
  cost?: number
  requestsByEndpoint?: EndpointBillingDetailsModel[]
}

export interface EndpointBillingDetailsModel {
  endpoint?: string
  requestCount?: number
  cost?: number
}

export interface TrafficEventsStatisticsSummaryModel {
  from?: string
  to?: string
  totalRequestCount?: number
  totalEndpointCount?: number
  requestsByEndpoint?: EndpointStatisticsModel[]
  requestsByDate?: DateStatisticsModel[]
  requestsByCustomer?: CustomerStatisticsModel[]
}

export interface EndpointStatisticsModel {
  endpoint?: string
  requestCount?: number
}

export interface DateStatisticsModel {
  date?: string
  requestCount?: number
}

export interface CustomerStatisticsModel {
  customerId?: string
  requestCount?: number
}
// end manual defined Model

export interface FetchBillingsParams {
  applicationId?: string[]
  dateFrom?: string
  dateTo?: string
}

export interface FetchBillingsByMonthParams {
  applicationId?: string[]
  month: string
}

export interface DownloadTrafficEventsByMonthParams {
  applicationId?: string[]
  month: string
}

export interface FetchTrafficStatisticsParams {
  applicationId?: string[]
  customerId?: string[]
  dateFrom?: string
  dateTo?: string
}

export const fetchBillings = async (params: FetchBillingsParams): Promise<BillingSummaryModel> => {
  try {
    const response = await fetcher({
      url: `${URLS.trafficEventBilling}?${setQueryParams(params)}`,
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

export const fetchBillingsByMonth = async (params: FetchBillingsByMonthParams): Promise<BillingDetailsModel> => {
  try {
    const { month, ...rest } = params
    const response = await fetcher({
      url: `${URLS.trafficEventBilling}/${month}?${setQueryParams(rest)}`,
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

export const downloadTrafficEventsByMonth = async (params: DownloadTrafficEventsByMonthParams) => {
  try {
    const { month, ...rest } = params
    const response = await fetcher({
      url: `${URLS.trafficEventBilling}/${month}/download?${setQueryParams(rest)}`,
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

export const fetchTrafficStatistics = async (
  params: FetchTrafficStatisticsParams,
): Promise<TrafficEventsStatisticsSummaryModel> => {
  try {
    const response = await fetcher({
      url: `${URLS.trafficEventStatistics}?${setQueryParams(params)}`,
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

