import { fetcher, notification } from '@reapit/elements'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { BASE_HEADERS, URLS } from '../constants/api'
import { AppRestriction } from '../types/app-restrictions'

export const getAppsService = async (search: string): Promise<AppSummaryModelPagedResult | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: AppSummaryModelPagedResult | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.APPS}/${search ? search : '?pageNumber=1&pageSize=12'}&clientId=SBOX&showHiddenApps=true`,
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        'api-version': 'latest',
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (response) {
      return response
    }

    throw new Error('Failed to fetch apps')
  } catch (err) {
    console.error('Error', err.message)
    notification.error({
      message: 'Failed to fetch apps',
      placement: 'bottomRight',
    })
  }
}

export const updateAppRestrictionsService = async (restriction: AppRestriction): Promise<any | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: any | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.CUSTOMERS}/${session.loginIdentity.orgId}/appRestrictions`,
      method: 'POST',
      headers: {
        ...BASE_HEADERS,
        'api-version': 'latest',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: restriction,
    })

    if (response) {
      return response
    }

    throw new Error('Failed to update app restrictions')
  } catch (err) {
    console.error('Error', err.message)
  }
}
