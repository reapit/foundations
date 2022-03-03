import { fetcher } from '@reapit/utils-common'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { URLS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { SettingsModel } from '../types/settings'

export const getSettingsService = async (): Promise<SettingsModel | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')
    const headers = await getPlatformHeaders(reapitConnectBrowserSession)

    if (headers) {
      const response: SettingsModel | undefined = await fetcher({
        api: window.reapit.config.platformApiUrl,
        url: `${URLS.SETTINGS}/${session.loginIdentity.orgId}`,
        method: 'GET',
        headers,
      })

      if (response) {
        return response
      }

      throw new Error('Failed to fetch settings')
    }
  } catch (err) {
    logger(err as Error)
  }
}

export const updateSettingsService = async (settings: Partial<SettingsModel>): Promise<boolean | undefined> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')
    const headers = await getPlatformHeaders(reapitConnectBrowserSession)

    if (headers) {
      const response: boolean | undefined = await fetcher({
        api: window.reapit.config.platformApiUrl,
        url: `${URLS.SETTINGS}/${session.loginIdentity.orgId}`,
        method: 'PATCH',
        headers,
        body: settings,
      })

      if (response) {
        return response
      }
      throw new Error('Failed to update settings')
    }
  } catch (err) {
    logger(err as Error)
  }
}
