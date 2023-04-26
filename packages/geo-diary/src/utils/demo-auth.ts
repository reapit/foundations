import { ReapitConnectBrowserSession, ReapitConnectSession } from '@reapit/connect-session'
import { fetcher } from '@reapit/utils-common'
import { isDemo } from '@reapit/utils-react'

export const handleDemoAuth = async (): Promise<null> => {
  if (!isDemo()) return null

  const { appId, connectClientId, demoUser, platformApiUrl } = process.env
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
    window.sessionStorage.setItem(
      `${ReapitConnectBrowserSession.REFRESH_TOKEN_KEY}_${demoUser}_${connectClientId}`,
      reapitConnectSession.refreshToken,
    )
    window.sessionStorage.setItem(`${ReapitConnectBrowserSession.USER_NAME_KEY}_${connectClientId}`, demoUser)
  }

  return null
}
