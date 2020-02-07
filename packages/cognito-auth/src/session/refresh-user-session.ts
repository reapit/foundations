import errorStrings from '../constants/error-strings'
import { tokenRefreshUserSessionService, codeRefreshUserSessionService } from '../services/session/refresh-user-session'
import { RefreshParams, LoginSession } from '../core/types'
import { deserializeIdToken, checkHasIdentityId, setSessionCookie, COOKIE_SESSION_KEY } from '../utils/cognito'

export const refreshUserSession = async (params: RefreshParams): Promise<Partial<LoginSession> | undefined | void> => {
  const { userName, refreshToken, cognitoClientId, authorizationCode, redirectUri } = params

  try {
    if (userName && refreshToken && cognitoClientId) {
      return await tokenRefreshUserSessionService(userName, refreshToken, cognitoClientId)
    }

    if (authorizationCode && redirectUri && cognitoClientId) {
      return await codeRefreshUserSessionService(authorizationCode, redirectUri, cognitoClientId)
    }

    throw new Error(errorStrings.REFRESH_TOKEN_PASSWORD_REQUIRED)
  } catch (err) {
    console.error(`${errorStrings.REFRESH_SESSION_FAILED}, ${err}`)
  }
}

export const setRefreshSession = async (
  params: RefreshParams,
  cookieSessionKey: string = COOKIE_SESSION_KEY,
): Promise<LoginSession | null> => {
  const { userName, loginType, mode } = params
  const refreshedSession: Partial<LoginSession> | undefined | void = await refreshUserSession(params)
  const loginIdentity = refreshedSession && deserializeIdToken(refreshedSession)
  if (loginIdentity && checkHasIdentityId(loginType, loginIdentity)) {
    const loginSession = {
      ...refreshedSession,
      loginType: loginType ? loginType : 'CLIENT',
      userName: userName ? userName : loginIdentity.email,
      mode: mode ? mode : 'WEB',
      loginIdentity,
    } as LoginSession

    setSessionCookie(loginSession, cookieSessionKey)

    return loginSession
  }
  return null
}
