import { LoginSession, RefreshParams } from '../core/types'
import { tokenExpired, getSessionCookie, COOKIE_SESSION_KEY } from '../utils/cognito'
import { setRefreshSession } from './refresh-user-session'

export const getSession = async (
  loginSession: LoginSession | null,
  refreshSession: RefreshParams | null,
  cookieSessionKey: string = COOKIE_SESSION_KEY,
  appEnv?: string,
): Promise<LoginSession | null> => {
  const sessionExpired = loginSession && tokenExpired(loginSession.accessTokenExpiry)

  if (loginSession && !sessionExpired) {
    return loginSession
  }

  try {
    const env = appEnv ?? window?.reapit?.config?.appEnv
    const sessionToRefresh = refreshSession || getSessionCookie(cookieSessionKey, env)
    const refreshedSession = sessionToRefresh && (await setRefreshSession(sessionToRefresh, cookieSessionKey, env))

    if (refreshedSession) {
      return refreshedSession
    }
  } catch (err) {
    console.error(err)
    return null
  }

  return null
}
