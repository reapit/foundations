import { LOCAL_STORAGE_SESSION_KEY } from '../constants/session'
import { RefreshParams, LoginSession, LoginType, getAccessToken } from '@reapit/elements'
import store from '../core/store'
import { authLoginSuccess, authLogout } from '../actions/auth'

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
  const { loginSession, loginType, desktopSession } = store.state.auth

  const session = await getAccessToken({ loginSession, desktopSession })

  if (session) {
    store.dispatch(authLoginSuccess(session))
    return session.accessToken
  }

  store.dispatch(authLogout(loginType))
  return null
}
