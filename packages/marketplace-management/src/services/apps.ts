import { fetcher } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { URLS } from '../constants/api'
import { AppRestriction } from '../types/app-restrictions'
import { getPlatformHeaders, logger } from '@reapit/utils-react'

export const updateAppRestrictionsService = async (
  restriction: AppRestriction,
  orgClientId: string,
): Promise<any | undefined | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response: any | undefined = await fetcher({
        api: process.env.platformApiUrl,
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
    logger(err as Error)
  }
}
