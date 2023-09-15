import { ReapitConnectBrowserSession } from '@reapit/connect-session'
import Cookie from 'js-cookie'
import { getRCConfig } from './connect-session'

const url = getRCConfig().connectOAuthUrl + '/rpt/native'

const tokenCache: Record<string, Promise<string>> = {}

const fetchNativeToken = async (idToken: string) => {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'post',
    body: JSON.stringify({
      idToken,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Native token exchange resulted in ${res.status}: ${text}`)
  }
  const native = await res.json()
  return native.accessToken
}

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

      if (Object.hasOwn(tokenCache, session.idToken)) {
        accessToken = await tokenCache[session.idToken]
        return {
          ...session,
          accessToken,
        }
      }

      tokenCache[session.idToken] = fetchNativeToken(session.idToken)
      try {
        accessToken = await tokenCache[session.idToken]
      } catch (e) {
        console.error(e)
        reapitConnectBrowserSession.connectAuthorizeRedirect()
        delete tokenCache[session.idToken]
      }
      return {
        ...session,
        accessToken,
      }
    },
    accessToken,
  } as unknown as ReapitConnectBrowserSession
}
