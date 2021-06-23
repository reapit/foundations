import { fetcher, notification } from '@reapit/elements-legacy'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { URLS } from '../constants/api'
import { getPlatformHeaders, logger } from '@reapit/utils'

export const bulkInstall = async (
  installFor: (string | undefined)[],
  uninstallFor: (string | undefined)[],
  appId?: string,
): Promise<boolean> => {
  if (!appId) throw new Error('App Id not provided')

  const session = await reapitConnectBrowserSession.connectSession()
  if (!session) throw new Error('No Reapit Connect Session is present')

  try {
    const response = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.INSTALLATIONS}/bulk`,
      body: {
        appId,
        actionedBy: session.loginIdentity.email,
        installFor,
        uninstallFor,
      },
      method: 'POST',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })

    if (response) return true

    throw new Error('Failed to create bulk installations')
  } catch (err) {
    logger(err)
    notification.error({
      message: 'Failed to install',
    })

    throw err
  }
}
