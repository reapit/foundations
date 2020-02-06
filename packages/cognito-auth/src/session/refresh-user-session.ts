import errorStrings from '../constants/error-strings'
import { tokenRefreshUserSessionService, codeRefreshUserSessionService } from '../services/session/refresh-user-session'
import { RefreshParams, LoginSession } from '../core/types'
import { deserializeIdToken, checkHasIdentityId, setSessionCookie } from '../utils/cognito'

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

export const setRefreshSession = async (params: RefreshParams): Promise<LoginSession | null> => {
  const { userName, loginType, mode } = params
  const refreshedSession: Partial<LoginSession> | undefined | void = await refreshUserSession(params)
  const loginIdentity = refreshedSession && deserializeIdToken(refreshedSession)
  if (loginIdentity && checkHasIdentityId(loginType, loginIdentity)) {
    const loginSession = {
      ...refreshedSession,
      loginType,
      userName,
      mode,
      loginIdentity,
    } as LoginSession

    setSessionCookie(loginSession)

    return loginSession
  }
  return null
}
