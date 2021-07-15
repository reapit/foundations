import { ReapitConnectBrowserSession, ReapitConnectSession } from '@reapit/connect-session'
import { fetcher } from '@reapit/elements-legacy'

export const handleDemoAuth = async (): Promise<null> => {
  const queryParams = new URLSearchParams(window.location.search)
  const isDemo = queryParams.get('demo')

  if (!isDemo) return null

  const { appId, connectClientId, demoUser, platformApiUrl } = window.reapit.config
  const reapitConnectSession: ReapitConnectSession | never = await fetcher({
    api: platformApiUrl,
    url: `/marketplace/apps/${appId}/demonstration`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      externalAppId: connectClientId,
    },
  })

  if (reapitConnectSession.refreshToken) {
    window.localStorage.setItem(
      `${ReapitConnectBrowserSession.REFRESH_TOKEN_KEY}_${demoUser}_${connectClientId}`,
      reapitConnectSession.refreshToken,
    )
    window.localStorage.setItem(`${ReapitConnectBrowserSession.USER_NAME_KEY}_${connectClientId}`, demoUser)
  }

  return null
}
