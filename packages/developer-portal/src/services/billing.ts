// import { BillingS } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { generateHeaderWithApiV2 } from './utils'
import { URLS } from './constants'
import { logger } from '@reapit/utils'
import { BillingBreakdownForMonthV2Model } from '@reapit/foundations-ts-definitions'

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
  month: string
}

export const fetchBillings = async (params: FetchBillingsParams): Promise<BillingSummaryModel> => {
  try {
    const response = await fetcher({
      url: `${URLS.trafficEventBilling}?${setQueryParams(params)}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: generateHeaderWithApiV2(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const fetchBillingsByMonth = async (
  params: FetchBillingsByMonthParams,
): Promise<BillingBreakdownForMonthV2Model> => {
  try {
    const { month, ...rest } = params
    const response = await fetcher({
      url: `${URLS.trafficEventBilling}/${month}?${setQueryParams(rest)}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: generateHeaderWithApiV2(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
