import { fetcher, setQueryParams } from '@reapit/utils-common'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { BillingBreakdownForMonthV2Model } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { AnalyticsFilterState } from '../components/pages/analytics-v2/state/use-analytics-state'
import qs from 'qs'
import { fetcherWithBlob } from '@reapit/utils-common'
import fileSaver from 'file-saver'
import dayjs from 'dayjs'

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
  applicationId?: string | string[]
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
    logger(error as Error)
    throw error
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
    logger(error as Error)
    throw error
  }
}

export const batchFetchBillingService = async (monthRequests: string[], query: string) => {
  const headers = await getPlatformHeaders(reapitConnectBrowserSession, '2')

  if (!headers) return

  try {
    return Promise.all(
      monthRequests.map(async (month) => {
        const response = await fetcher({
          url: `${URLS.trafficEventBilling}/${month}?${query}&type=trafficEvents&type=dataWarehouseUsage&type=applicationListing&type=developerEdition&type=developerRegistration&type=dataWarehouse`,
          api: window.reapit.config.platformApiUrl,
          method: 'GET',
          headers,
        })

        if (response) {
          return response as BillingBreakdownForMonthV2Model
        }
      }),
    )
  } catch (err) {
    logger(err as Error)
  }
}

export const billingTransactionDownloadService = async (
  analyticsFilterState: AnalyticsFilterState,
  displayMonth: string,
  developerId?: string | null,
) => {
  const { clientId, appId } = analyticsFilterState
  const month = dayjs(displayMonth).format('YYYY-MM')
  const customerIdQuery = clientId ? { customerId: clientId } : {}
  const appIdQuery = appId ? { applicationId: appId } : {}
  const query = qs.stringify({ ...customerIdQuery, ...appIdQuery, developerId })

  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const blob = await fetcherWithBlob({
        url: `${URLS.trafficEventBilling}/${month}/download?${query}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
      const fileName = `reapit-billing-data-${month}.csv`
      fileSaver.saveAs(blob, fileName)
      return true
    }
  } catch (error) {
    logger(error as Error)
    return false
  }
}
