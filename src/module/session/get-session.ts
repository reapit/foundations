import { LoginSession, RefreshParams } from '../../core/types'
import { tokenExpired, getSessionCookie } from '../../utils/cognito'
import { setRefreshSession } from './refresh-user-session'

export const getSession = async (
  loginSession: LoginSession | null,
  refreshSession: RefreshParams | null
): Promise<LoginSession | null> => {
  if (loginSession) {
    const sessionExpired = tokenExpired(loginSession.accessTokenExpiry)

    if (!sessionExpired) {
      return loginSession
    }
  }

  const sessionToRefresh = refreshSession || getSessionCookie()

  if (sessionToRefresh) {
    try {
      const refreshedSession = await setRefreshSession(sessionToRefresh)

      if (refreshedSession) {
        return refreshedSession
      }
    } catch (err) {
      console.error(err)
      return null
    }
  }

  return null
}
