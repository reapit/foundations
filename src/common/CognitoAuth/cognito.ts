import jwt from 'jsonwebtoken'
import { fetcher } from '../../utils/fetcher'
import { LoginSession, LoginType, LoginIdentity, CoginitoIdentity, LoginParams, RefreshParams } from './types'
import { COGNITO_API_BASE_URL, COGNITO_HEADERS } from './constants'

/**
 * Used to verify if an access token has expired by checking time now against token expiry
 */
export const tokenExpired = (expiry: number) => {
  // Adding a minute to avoid race conditions on the API and CPU clock innaccuracies
  const timeNowPlusMin = Math.round(new Date().getTime() / 1000) + 60
  return expiry < timeNowPlusMin
}

/**
 * Handles business logic to return an access token
 * Return the session after verifying if it's not expired
 * Return null if there are not any sessions
 * Return refreshedSession if it's fetched successfully
 * Return null at the end after trying all ways
 */
export const getAccessToken = async ({ loginSession, desktopSession }): Promise<LoginSession | null> => {
  if (!loginSession && !desktopSession) {
    return null
  }

  if (loginSession) {
    const sessionExpired = tokenExpired(loginSession.accessTokenExpiry)

    if (!sessionExpired) {
      return loginSession as LoginSession
    }
  }

  const sessionToRefresh = (loginSession || desktopSession) as RefreshParams

  try {
    const refreshedSession = await refreshSession(sessionToRefresh)
    if (refreshedSession) {
      return refreshedSession
    }
  } catch (err) {
    console.error(err)
  }

  return null
}

export const refreshSession = async ({ userName, refreshToken, loginType }: RefreshParams) => {
  const refreshedSession: Partial<LoginSession> | undefined = await fetcher({
    api: COGNITO_API_BASE_URL,
    url: '/refresh',
    method: 'POST',
    body: { userName, refreshToken },
    headers: COGNITO_HEADERS
  })

  const loginIdentity = deserializeIdToken(refreshedSession)

  return {
    ...refreshedSession,
    loginType,
    userName,
    loginIdentity
  } as LoginSession
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
