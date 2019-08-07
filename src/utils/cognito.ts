import jwt from 'jsonwebtoken'
import store from '../core/store'
import { authLoginSuccess, authLogout } from '../actions/auth'
import { LoginSession, LoginType, LoginIdentity, CoginitoIdentity } from '../reducers/auth'
import fetcher from './fetcher'
import { COGNITO_API_BASE_URL, COGNITO_HEADERS } from '../constants/api'

export interface LoginParams {
  userName: string
  password: string
  loginType: LoginType
}

export interface RefreshParams {
  userName: string
  refreshToken: string
  loginType: LoginType
}

/**
 * Used to verify if an access token has expired by checking time now against token expiry
 */
export const tokenExpired = (expiry: number) => {
  // Adding a minute to avoid race conditions on the API and CPU clock innaccuracies
  const timeNowPlusMin = Math.round(new Date().getTime() / 1000) + 60
  return expiry < timeNowPlusMin
}

/**
 * Convenience method to log the user out when Cognito fails and ensure LoginSession is restored to
 * null in Redux
 */
export const logOutUser = (loginType: LoginType) => {
  store.dispatch(authLogout(loginType))
  return null
}

/**
 * Handles business logic to return an access token
 * If I don't have a session in Redux, logout
 * If I do have one in Redux and not expired, return that session
 * If not, refresh session
 * If that fails, logout
 */
export const getAccessToken = async (): Promise<string | null> => {
  const { loginSession, loginType, desktopSession } = store.state.auth

  if (loginSession) {
    const sessionExpired = tokenExpired(loginSession.accessTokenExpiry)

    if (!sessionExpired) {
      return loginSession.accessToken
    }
  }

  if (!loginSession && !desktopSession) {
    return logOutUser(loginType)
  }

  const sessionToRefresh = (loginSession || desktopSession) as RefreshParams

  try {
    const refreshedSession = await refreshSession(sessionToRefresh)
    if (refreshedSession) {
      store.dispatch(authLoginSuccess(refreshedSession))
      return refreshedSession.accessToken
    }
  } catch (err) {
    console.error(err)
  }

  return logOutUser(loginType)
}

export const refreshSession = async ({ userName, refreshToken, loginType }: RefreshParams) => {
  const refreshedSession: Partial<LoginSession> | undefined = await fetcher({
    url: '/refresh',
    method: 'POST',
    api: COGNITO_API_BASE_URL,
    body: { userName, refreshToken },
    isPrivate: false,
    headers: COGNITO_HEADERS
  })

  const loginIdentity = deserializeIdToken(refreshedSession)

  return { ...refreshedSession, loginType, userName, loginIdentity } as LoginSession
}

export const deserializeIdToken = (loginSession: Partial<LoginSession> | undefined): LoginIdentity => {
  const decoded = loginSession && loginSession.idToken ? (jwt.decode(loginSession.idToken) as CoginitoIdentity) : {}

  return {
    name: decoded['name'],
    email: decoded['email'],
    developerId: decoded['custom:reapit:developerId'] || null,
    clientId: decoded['custom:reapit:clientCode'] || null,
    adminId: decoded['custom:reapit:marketAdmin'] || null
  }
}
