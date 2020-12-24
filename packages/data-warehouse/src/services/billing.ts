import { fetcher } from '@reapit/elements'
import { BillingBreakdownForMonthV2Model, BillingOverviewForPeriodV2Model } from '@reapit/foundations-ts-definitions'
import { URLS, BASE_HEADERS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'

export const getBillingByMonthService = async (
  month: string,
): Promise<BillingBreakdownForMonthV2Model | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: BillingBreakdownForMonthV2Model | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.BILLING}/${month}?organisationId=${session.loginIdentity.orgId}&type=dataWarehouse&type=dataWarehouseUsage`,
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
        'api-version': '2',
      },
    })

    if (response) {
      return response
    }

    throw new Error('Failed to fetch billing')
  } catch (err) {
    console.error('Error', err.message)
  }
}

export const getBillingByDatesService = async (
  dateTo: string,
  dateFrom: string,
): Promise<BillingOverviewForPeriodV2Model | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: BillingOverviewForPeriodV2Model | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.BILLING}?organisationId=${session.loginIdentity.orgId}&dateTo=${dateTo}&dateFrom=${dateFrom}&type=dataWarehouse&type=dataWarehouseUsage`,
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
        'api-version': '2',
      },
    })

    if (response) {
      return response
    }

    throw new Error('Failed to fetch billing')
  } catch (err) {
    console.error('Error', err.message)
  }
}
