import { LOCAL_STORAGE_SESSION_KEY } from '@/constants/session'
import store from '@/core/store'
import { RefreshParams, LoginSession, LoginType, tokenExpired, refreshSession } from '@reapit/elements'
import { authLoginSuccess, authLogout } from '@/actions/auth'
import { selectOnlineStatus } from '@/selectors/online'
import hardtack from 'hardtack'

// TODO - needs test and to remove CloudFront - need to get into prod to check this works first
export const setCookie = (session: LoginSession): void => {
  const { href } = window.location
  const whitelistedHost = href.includes('.reapit.com')
    ? '.reapit.com'
    : href.includes('.cloudfront.net')
    ? '.cloudfront.net'
    : href.includes('localhost')
    ? 'localhost'
    : null

  if (whitelistedHost) {
    hardtack.set(LOCAL_STORAGE_SESSION_KEY, session.refreshToken, {
      path: '/',
      domain: whitelistedHost,
      expires: new Date(Date.now() + 2629800000).toUTCString(),
      samesite: 'lax'
    })
  }
}

export const setLoginSession = (session: LoginSession): void => {
  try {
    const sessionJSON = JSON.stringify(session)
    window.localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, sessionJSON)
  } catch (err) {
    console.error('ERROR SETTING SESSION', err.message)
  }
}

export const getLoginSession = (): LoginSession | null => {
  try {
    const sessionJSON = window.localStorage.getItem(LOCAL_STORAGE_SESSION_KEY)
    if (sessionJSON) {
      return JSON.parse(sessionJSON) as LoginSession
    }
    return null
  } catch (err) {
    console.error('ERROR GETTING SESSION', err.message)
    return null
  }
}

export const removeLoginSession = (): void => {
  try {
    window.localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY)
  } catch (err) {
    console.error('ERROR REMOVING SESSION', err.message)
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
      loginType
    }
  }

  return null
}

export const verifyAccessToken = async (): Promise<string | null> => {
  const { loginSession, desktopSession } = store.state.auth
  const online = selectOnlineStatus(store.state)

  if (!online) {
    store.dispatch(authLogout())
    return null
  }

  if (!loginSession && !desktopSession) {
    store.dispatch(authLogout())
    return null
  }

  if (loginSession) {
    const sessionExpired = tokenExpired(loginSession.accessTokenExpiry)

    if (!sessionExpired) {
      return loginSession.accessToken
    }
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

  store.dispatch(authLogout())
  return null
}
