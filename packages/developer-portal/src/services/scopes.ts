import { ScopeModel } from '@reapit/foundations-ts-definitions'
import { fetcher } from '@reapit/elements'
import { URLS } from './constants'
import { getPlatformHeaders, logger } from '@reapit/utils'
import { reapitConnectBrowserSession } from '../core/connect-session'

export const fetchScopeListAPI = async (): Promise<ScopeModel[]> => {
  try {
    const response = await fetcher({
      url: `${URLS.scopes}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })
    return response
  } catch (error) {
    logger(error)
    throw error?.response
  }
}
