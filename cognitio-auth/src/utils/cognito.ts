import hardtack from 'hardtack'
import jwt from 'jsonwebtoken'
import { CognitoUserPool, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js'
import { LoginSession, RefreshParams, LoginType, LoginIdentity, CoginitoIdentity } from '../core/types'

export const COOKIE_SESSION_KEY = 'reapit-marketplace-session'
export const COOKIE_DOMAIN_WHITELIST = ['.reapit.com', 'localhost']
export const COOKIE_EXPIRY = new Date(Date.now() + 2629800000).toUTCString() // 1month from now
export const TOKEN_EXPIRY = Math.round(new Date().getTime() / 1000) + 60 // 1 minute from now
/**
 * Convenience method to deserialize a CognitoUser session - necessary as these getter methods are
 * not available when I have saved and retreived the session from localStorage
 */
export const getLoginSession = (session: CognitoUserSession): Partial<LoginSession> => ({
  accessToken: session.getAccessToken().getJwtToken(),
  accessTokenExpiry: session.getAccessToken().getExpiration(),
  idToken: session.getIdToken().getJwtToken(),
  idTokenExpiry: session.getIdToken().getExpiration(),
  refreshToken: session.getRefreshToken().getToken()
})

/**
 * Convenience method to return a new CognitoUser with user identifier.
 * The COGNITO_USERPOOL_ID and COGNITO_USERPOOL_ID are in the .env file in dev and set in the
 * AWS console as env variables in prod.
 */
export const getNewUser = (userName: string) => {
  const poolData = {
    UserPoolId: process.env.COGNITO_USERPOOL_ID as string,
    ClientId: process.env.COGNITO_CLIENT_ID as string
  }
  const userPool = new CognitoUserPool(poolData)
  const userData = {
    Username: userName,
    Pool: userPool
  }
  return new CognitoUser(userData)
}

export const setSessionCookie = (session: LoginSession, href = window.location.href): void => {
  const whitelistedHost = COOKIE_DOMAIN_WHITELIST.filter(item => href.includes(item))[0]

  if (whitelistedHost) {
    const { userName, refreshToken, loginType, mode } = session
    hardtack.set(
      COOKIE_SESSION_KEY,
      JSON.stringify({
        refreshToken,
        loginType,
        userName,
        mode
      }),
      {
        path: '/',
        domain: whitelistedHost,
        expires: COOKIE_EXPIRY,
        samesite: 'lax'
      }
    )
  }
}

export const getSessionCookie = (): RefreshParams | null => {
  try {
    const session = hardtack.get(COOKIE_SESSION_KEY)
    if (session) {
      return JSON.parse(session) as RefreshParams
    }
    return null
  } catch {
    return null
  }
}

export const getTokenFromQueryString = (queryString: string, loginType: LoginType = 'CLIENT'): RefreshParams | null => {
  const params = new URLSearchParams(queryString)
  const refreshToken = params.get('desktopToken')
  const userName = params.get('username')

  if (refreshToken && userName) {
    return {
      refreshToken,
      userName,
      loginType,
      mode: 'DESKTOP'
    }
  }

  return null
}

export const deserializeIdToken = (loginSession: Partial<LoginSession> | undefined): LoginIdentity => {
  const decoded =
    loginSession && (loginSession as LoginSession).idToken
      ? (jwt.decode((loginSession as LoginSession).idToken) as CoginitoIdentity)
      : ({} as CoginitoIdentity)

  return {
    name: decoded['name'],
    email: decoded['email'],
    developerId: decoded['custom:reapit:developerId'] || null,
    clientId: decoded['custom:reapit:clientCode'] || null,
    adminId: decoded['custom:reapit:marketAdmin'] || null,
    userCode: decoded['custom:reapit:userCode'] || null
  }
}

/**
 * Used to verify if an access token has expired by checking time now against token expiry
 */
export const tokenExpired = (expiry: number) => {
  return expiry < TOKEN_EXPIRY
}

export const checkHasIdentityId = (loginType: LoginType, loginIdentity: LoginIdentity) =>
  (loginType === 'CLIENT' && !!loginIdentity.clientId) ||
  (loginType === 'DEVELOPER' && !!loginIdentity.developerId) ||
  (loginType === 'ADMIN' && !!loginIdentity.adminId)
