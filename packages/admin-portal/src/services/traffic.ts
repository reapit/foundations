import { FetchError, fetcherWithBlob } from '@reapit/utils-common'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { URLS } from './constants'

export const fetchTrafficPeriod = async (period: string) => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, '2')
    if (headers) {
      return fetcherWithBlob({
        url: `${URLS.traffic}/${period}`,
        api: window.reapit.config.platformApiUrl,
        method: 'GET',
        headers,
      })
    }
  } catch (error) {
    logger(error as FetchError)
  }
}
