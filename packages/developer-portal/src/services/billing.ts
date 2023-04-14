import { fetcher } from '@reapit/utils-common'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { BillingBreakdownForMonthV2Model } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { AnalyticsFilterState } from '../components/analytics/state/use-analytics-state'
import qs from 'qs'
import { fetcherWithBlob } from '@reapit/utils-common'
import fileSaver from 'file-saver'
import dayjs from 'dayjs'

export const batchFetchBillingService = async (monthRequests: string[], query: string) => {
  const headers = await getPlatformHeaders(reapitConnectBrowserSession, '2')

  if (!headers) return

  try {
    return Promise.all(
      monthRequests.map(async (month) => {
        const response = await fetcher({
          url: `/trafficevents/billing/${month}?${query}&type=trafficEvents&type=dataWarehouseUsage&type=applicationListing&type=developerEdition&type=developerRegistration&type=dataWarehouse`,
          api: process.env.platformApiUrl,
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
        url: `/trafficevents/billing/${month}/download?${query}`,
        api: process.env.platformApiUrl,
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
