import { URLS } from '../constants/api'
import { fetcher } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { logger } from '@reapit/utils-react'

export const fetchConfigWithKey = async (configKey: string): Promise<any | undefined> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()
    if (!session || !session.loginIdentity.clientId) throw new Error('No Reapit Connect Session is present')
    const response = await fetcher({
      api: window.reapit.config.configServiceUrl,
      url: `${URLS.CONFIG}/${configKey}`,
      method: 'GET',
      headers: {
        Authorization: session.idToken,
      },
    })
    if (response) {
      return response
    }
    throw new Error('Failed to get from parameter store')
  } catch (err) {
    logger(err as Error)
  }
}
