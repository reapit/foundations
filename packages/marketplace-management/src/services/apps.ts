import { fetcher } from '@reapit/utils-common'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { URLS } from '../constants/api'
import { AppRestriction } from '../types/app-restrictions'
import { getPlatformHeaders, logger } from '@reapit/utils-react'

export const getAppsService = async (
  search: string,
  orgClientId: string,
): Promise<AppSummaryModelPagedResult | undefined | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response: AppSummaryModelPagedResult | undefined = await fetcher({
        api: window.reapit.config.platformApiUrl,
        url: `${URLS.APPS}/${
          search ? search : '?pageNumber=1&pageSize=12'
        }&clientId=${orgClientId}&showHiddenApps=true`,
        method: 'GET',
        headers,
      })

      if (response) {
        const apps = response.data?.filter((app) => !window.reapit.config.appIdsToFilter.includes(app.id as string))

        return {
          ...response,
          data: apps,
        }
      }
      throw new Error('Failed to fetch apps')
    }
  } catch (err) {
    logger(err)
  }
}

export const updateAppRestrictionsService = async (
  restriction: AppRestriction,
  orgClientId: string,
): Promise<any | undefined | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response: any | undefined = await fetcher({
        api: window.reapit.config.platformApiUrl,
        url: `${URLS.CUSTOMERS}/${orgClientId}/appRestrictions`,
        method: 'POST',
        headers,
        body: restriction,
      })

      if (response) {
        return response
      }
      throw new Error('Failed to update app restrictions')
    }
  } catch (err) {
    logger(err)
  }
}
