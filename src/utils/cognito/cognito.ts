import { fetcher } from '../fetcher/fetcher'
import { LoginSession, RefreshParams, LoginParams } from './types'
import { COGNITO_API_BASE_URL, COGNITO_HEADERS } from './constants'
import { setSessionCookie, deserializeIdToken, checkHasIdentityId } from '../session/index'

export const getCognitoSession = async ({
  userName,
  password,
  loginType,
  mode
}: LoginParams): Promise<LoginSession | null> => {
  try {
    const loginDetails: Partial<LoginSession> | undefined = await fetcher({
      api: COGNITO_API_BASE_URL,
      url: `/login`,
      method: 'POST',
      body: { userName, password },
      headers: COGNITO_HEADERS
    })

    if (loginDetails) {
      const loginIdentity = deserializeIdToken(loginDetails)
      if (checkHasIdentityId(loginType, loginIdentity)) {
        const loginSession = { ...loginDetails, loginType, mode, userName, loginIdentity } as LoginSession

        setSessionCookie(loginSession)

        return loginSession
      }
    }
    return null
  } catch (err) {
    console.error('ERROR LOGING IN', err)
    return null
  }
}

export const refreshCognitoSession = async ({
  userName,
  refreshToken,
  loginType,
  mode
}: RefreshParams): Promise<LoginSession | null> => {
  try {
    const refreshedSession: Partial<LoginSession> | undefined = await fetcher({
      api: COGNITO_API_BASE_URL,
      url: '/refresh',
      method: 'POST',
      body: { userName, refreshToken },
      headers: COGNITO_HEADERS
    })

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
  } catch (err) {
    console.error('ERROR REFRESHING', err)
    return null
  }
}
