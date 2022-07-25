import { ScopeModel } from '@reapit/foundations-ts-definitions'
import { fetcher } from '@reapit/utils-common'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../core/connect-session'

export const fetchScopesList = async (): Promise<ScopeModel[] | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      return fetcher({
        url: `${URLS.scopes}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
    }
  } catch (error) {
    logger(error as Error)
    throw error
  }
}
