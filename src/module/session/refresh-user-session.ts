import errorStrings from '../../constants/error-strings'
import { refreshUserSessionService } from '../../services/session/refresh-user-session'
import { RefreshParams, LoginSession } from '../../core/types'
import { deserializeIdToken, checkHasIdentityId, setSessionCookie } from '../../utils/cognito'

export const refreshUserSession = async (params: RefreshParams): Promise<Partial<LoginSession> | undefined> => {
  const { userName, refreshToken } = params

  try {
    if (!userName || !refreshToken) {
      throw new Error(errorStrings.REFRESH_TOKEN_PASSWORD_REQUIRED)
    }
    const session = await refreshUserSessionService(params)
    return session
  } catch (err) {
    console.error(`${errorStrings.REFRESH_SESSION_FAILED}, ${err}`)
  }
}

export const setRefreshSession = async (params: RefreshParams): Promise<LoginSession | null> => {
  const { userName, loginType, mode } = params
  const refreshedSession: Partial<LoginSession> | undefined = await refreshUserSession(params)

  if (refreshedSession) {
    const loginIdentity = deserializeIdToken(refreshedSession)

    if (checkHasIdentityId(loginType, loginIdentity)) {
      const loginSession = {
        ...refreshedSession,
        loginType,
        userName,
        mode,
        loginIdentity
      } as LoginSession

      setSessionCookie(loginSession)

      return loginSession
    }
  }

  return null
}
