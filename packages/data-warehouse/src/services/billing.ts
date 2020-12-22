import { fetcher } from '@reapit/elements'
import { BillingBreakdownForMonthV2Model, BillingOverviewForPeriodV2Model } from '@reapit/foundations-ts-definitions'
import { URLS, BASE_HEADERS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { TrafficEventsStatisticsSummaryModel } from '../types/traffic'

export const getBillingByMonthService = async (
  month: string,
): Promise<BillingBreakdownForMonthV2Model | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: BillingBreakdownForMonthV2Model | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.BILLING}/${month}?developerId=${session.loginIdentity.developerId}`,
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
      url: `${URLS.BILLING}?developerId=${session.loginIdentity.developerId}&dateTo=${dateTo}&dateFrom=${dateFrom}`,
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

export const getStatsByDatesService = async (
  dateTo: string,
  dateFrom: string,
): Promise<TrafficEventsStatisticsSummaryModel | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: TrafficEventsStatisticsSummaryModel | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.STATS}?developerId=${session.loginIdentity.developerId}&dateTo=${dateTo}&dateFrom=${dateFrom}`,
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
        'api-version': '1',
      },
    })

    if (response) {
      return response
    }

    throw new Error('Failed to fetch traffic stats')
  } catch (err) {
    console.error('Error', err.message)
  }
}
