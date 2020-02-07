import hardtack from 'hardtack'
import jwt from 'jsonwebtoken'
import { CognitoUserPool, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js'
import { LoginSession, RefreshParams, LoginType, LoginIdentity, CoginitoIdentity } from '../core/types'

export const COOKIE_SESSION_KEY = 'reapit-marketplace-session'
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
  refreshToken: session.getRefreshToken().getToken(),
})

export const getNewUser = (userName: string, cognitoClientId: string) => {
  const poolData = {
    UserPoolId: process.env.COGNITO_USERPOOL_ID as string,
    ClientId: cognitoClientId,
  }
  const userPool = new CognitoUserPool(poolData)
  const userData = {
    Username: userName,
    Pool: userPool,
  }
  return new CognitoUser(userData)
}

export const setSessionCookie = (session: LoginSession, identifier: string = COOKIE_SESSION_KEY): void => {
  const { userName, refreshToken, loginType, mode } = session
  hardtack.set(
    identifier,
    JSON.stringify({
      refreshToken,
      loginType,
      userName,
      mode,
    }),
    {
      path: '/',
      domain: window.location.hostname,
      expires: COOKIE_EXPIRY,
      samesite: 'lax',
    },
  )
}

export const getSessionCookie = (identifier: string = COOKIE_SESSION_KEY): RefreshParams | null => {
  try {
    const session = hardtack.get(identifier)
    if (session) {
      return JSON.parse(session) as RefreshParams
    }
    return null
  } catch {
    return null
  }
}

export const getTokenFromQueryString = (
  queryString: string,
  cognitoClientId: string,
  loginType: LoginType = 'CLIENT',
  redirectUri: string = window.location.origin,
): RefreshParams | null => {
  const params = new URLSearchParams(queryString)
  const authorizationCode = params.get('code')
  const state = params.get('state')
  const mode = state && state.includes('') ? 'DESKTOP' : 'WEB'

  if (authorizationCode) {
    return {
      cognitoClientId,
      authorizationCode,
      redirectUri,
      state,
      refreshToken: null,
      userName: null,
      loginType,
      mode,
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
    userCode: decoded['custom:reapit:userCode'] || null,
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

export const redirectToOAuth = (congitoClientId: string, redirectUri: string = window.location.origin): void => {
  window.location.href =
    `${process.env.COGNITO_OAUTH_URL}/authorize?` +
    `response_type=code&client_id=${congitoClientId}&redirect_uri=${redirectUri}`
}

export const redirectToLogin = (congitoClientId: string, redirectUri: string = window.location.origin): void => {
  window.location.href =
    `${process.env.COGNITO_OAUTH_URL}/login?` +
    `response_type=code&client_id=${congitoClientId}&redirect_uri=${redirectUri}`
}

export const redirectToLogout = (congitoClientId: string, redirectUri: string = window.location.origin): void => {
  window.location.href =
    `${process.env.COGNITO_OAUTH_URL}/logout?` + `client_id=${congitoClientId}&logout_uri=${redirectUri}`
}
