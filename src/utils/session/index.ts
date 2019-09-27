import hardtack from 'hardtack'
import jwt from 'jsonwebtoken'
import { LoginSession, RefreshParams, LoginType, LoginIdentity, CoginitoIdentity } from '../cognito/types'
import { refreshCognitoSession } from '../cognito/cognito'

export const COOKIE_SESSION_KEY = 'reapit-marketplace-session'
export const COOKIE_DOMAIN_WHITELIST = ['.reapit.com', 'localhost']
export const COOKIE_EXPIRY = new Date(Date.now() + 2629800000).toUTCString() // 1month from now
export const TOKEN_EXPIRY = Math.round(new Date().getTime() / 1000) + 60 // 1 minute from now

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

export const removeSessionCookie = (href = window.location.href): void => {
  const whitelistedHost = COOKIE_DOMAIN_WHITELIST.filter(item => href.includes(item))[0]

  if (whitelistedHost) {
    hardtack.remove(COOKIE_SESSION_KEY, {
      path: '/',
      domain: whitelistedHost
    })
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
  const decoded = loginSession && loginSession.idToken ? (jwt.decode(loginSession.idToken) as CoginitoIdentity) : {}

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
      const refreshedSession = await refreshCognitoSession(sessionToRefresh)

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
