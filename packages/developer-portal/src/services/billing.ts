import { fetcher, setQueryParams } from '@reapit/utils-common'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { BillingBreakdownForMonthV2Model } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../core/connect-session'

// Manual defined Model
export type BillingSummaryModel = {
  description?: string
  from?: string
  to?: string
  requestsByPeriod?: MonthlyBillingDetailsModel
}

export type MonthlyBillingDetailsModel = {
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

export type BillingDetailsModel = {
  period?: string
  totalEndpoints?: number
  totalRequests?: number
  totalCost?: number
  requestsByService?: ServiceBillingDetailsModel[]
}

export type ServiceBillingDetailsModel = {
  serviceName?: string
  endpointCount?: number
  requestCount?: number
  cost?: number
  requestsByEndpoint?: EndpointBillingDetailsModel[]
}

export type EndpointBillingDetailsModel = {
  endpoint?: string
  requestCount?: number
  cost?: number
}

export type FetchBillingsParams = {
  developerId?: string
  dateFrom?: string
  dateTo?: string
}

export type FetchBillingsByMonthParams = {
  developerId?: string
  customerId?: string
  month: string
}

export const fetchBillings = async (params: FetchBillingsParams): Promise<BillingSummaryModel | void> => {
  const api = window.reapit.config.platformApiUrl
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, '2')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.trafficEventBilling}?${setQueryParams(params)}`,
        api,
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

export const fetchBillingsByMonth = async (
  params: FetchBillingsByMonthParams,
): Promise<BillingBreakdownForMonthV2Model | void> => {
  const api = window.reapit.config.platformApiUrl
  try {
    const { month, customerId, ...rest } = params
    const queryParams = customerId
      ? {
          ...rest,
          customerId,
          type: 'trafficEvents',
        }
      : rest
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, '2')
    if (headers) {
      const response = await fetcher({
        url: `${URLS.trafficEventBilling}/${month}?${setQueryParams(queryParams)}`,
        api,
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
