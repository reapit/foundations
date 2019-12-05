import { LoginSession, RefreshParams } from '../../core/types'
import { tokenExpired, getSessionCookie } from '../../utils/cognito'
import { setRefreshSession } from './refresh-user-session'

export const getSession = async (
  loginSession: LoginSession | null,
  refreshSession: RefreshParams | null
): Promise<LoginSession | null> => {
  const sessionExpired = loginSession && tokenExpired(loginSession.accessTokenExpiry)

  if (loginSession && !sessionExpired) {
    return loginSession
  }

  try {
    const sessionToRefresh = refreshSession || getSessionCookie()
    const refreshedSession = sessionToRefresh && (await setRefreshSession(sessionToRefresh))

    if (refreshedSession) {
      return refreshedSession
    }
  } catch (err) {
    console.error(err)
    return null
  }

  return null
}
