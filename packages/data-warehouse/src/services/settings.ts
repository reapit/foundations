import { fetcher } from '@reapit/elements'
import { URLS, BASE_HEADERS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { SettingsModel } from '../types/settings'

export const getSettingsService = async (): Promise<SettingsModel | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: SettingsModel | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.SETTINGS}/${session.loginIdentity.orgId}`,
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (response) {
      return response
    }

    throw new Error('Failed to fetch settings')
  } catch (err) {
    console.error('Error', err.message)
  }
}

export const updateSettingsService = async (settings: Partial<SettingsModel>): Promise<boolean | undefined> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: boolean | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.SETTINGS}/${session.loginIdentity.orgId}`,
      method: 'PATCH',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: settings,
    })

    if (response) {
      return response
    }
    throw new Error('Failed to update settings')
  } catch (err) {
    console.error('Error', err.message)
  }
}
