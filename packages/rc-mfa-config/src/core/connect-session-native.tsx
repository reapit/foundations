import { ReapitConnectBrowserSession } from '@reapit/connect-session'
import Cookie from 'js-cookie'
import { getRCConfig } from './connect-session'

const url = getRCConfig().connectOAuthUrl + '/rpt/native'

const tokenCache: Record<string, string> = {}

export const nativeSessionWrapper = (reapitConnectBrowserSession: ReapitConnectBrowserSession) => {
  if (Cookie.get('mfa_native_token_required') !== 'true') {
    return reapitConnectBrowserSession
  }

  let accessToken
  return {
    connectSession: async () => {
      const session = await reapitConnectBrowserSession.connectSession()
      if (!session) {
        return session
      }
      if (tokenCache[session.idToken]) {
        accessToken = tokenCache[session.idToken]
        return {
          ...session,
          accessToken,
        }
      }
      const res = await fetch(url, {
        credentials: 'include',
        method: 'post',
        body: JSON.stringify({
          idToken: session.idToken,
        }),
      })
      if (!res.ok) {
        const text = await res.text()
        console.error(new Error(`Native token exchange resulted in ${res.status}: ${text}`))
        reapitConnectBrowserSession.connectAuthorizeRedirect()
        return session
      }
      const native = await res.json()
      accessToken = native.accessToken
      tokenCache[session.idToken] = native.accessToken
      return {
        ...session,
        accessToken,
      }
    },
    accessToken,
  } as unknown as ReapitConnectBrowserSession
}
