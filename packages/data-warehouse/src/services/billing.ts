import { fetcher } from '@reapit/elements'
import { BillingBreakdownForMonthV2Model, BillingOverviewForPeriodV2Model } from '@reapit/foundations-ts-definitions'
import { getPlatformHeaders, logger } from '@reapit/utils'
import { URLS } from '../constants/api'
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
      headers: await getPlatformHeaders(reapitConnectBrowserSession, '2'),
    })

    if (response) {
      return response
    }

    throw new Error('Failed to fetch billing')
  } catch (err) {
    logger(err)
  }
}

export const getBillingByDatesService = async (
  dateFrom: string,
  dateTo: string,
): Promise<BillingOverviewForPeriodV2Model | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: BillingOverviewForPeriodV2Model | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.BILLING}?organisationId=${session.loginIdentity.orgId}&dateTo=${dateTo}&dateFrom=${dateFrom}&type=dataWarehouse&type=dataWarehouseUsage`,
      method: 'GET',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, '2'),
    })

    if (response) {
      return response
    }

    throw new Error('Failed to fetch billing')
  } catch (err) {
    logger(err)
  }
}
