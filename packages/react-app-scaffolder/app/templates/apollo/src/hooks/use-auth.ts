import * as React from 'react'
import {
  LoginSession,
  RefreshParams,
  removeSession,
  getSession,
  redirectToLogout,
  getTokenFromQueryString,
  getSessionCookie,
} from '@reapit/cognito-auth'
import { COOKIE_SESSION_KEY } from '../constants/api'

export type AuthHook = {
  loginSession?: LoginSession | null
  logout: () => void
  getLoginSession: (refreshParams: RefreshParams | null) => Promise<void>
  refreshParams?: RefreshParams | null
}

export const useAuth = (): AuthHook => {
  const [isFetchSession, setFetchSession] = React.useState(false)
  const [loginSession, setLoginSession] = React.useState<LoginSession | null>(null)
  const urlParams: RefreshParams | null = getTokenFromQueryString(
    window.location.search,
    process.env.COGNITO_CLIENT_ID_<%= nameInConstantCase %> as string,
  )
  const cookieParams = getSessionCookie(COOKIE_SESSION_KEY)
  const refreshParams = cookieParams ? cookieParams : urlParams
  const getLoginSession = async () => {
    if (isFetchSession) return
    setFetchSession(true)
    const session = await getSession(loginSession, refreshParams, COOKIE_SESSION_KEY)
    const isChangeSession = session !== loginSession
    if (!isChangeSession) {
      setFetchSession(false)
      return
    }
    if (isChangeSession) {
      setLoginSession(session)
      setFetchSession(false)
    }
  }

  const logout = React.useCallback(() => {
    removeSession(COOKIE_SESSION_KEY)
    redirectToLogout(process.env.COGNITO_CLIENT_ID_<%= nameInConstantCase %> as string, `${window.location.origin}/login`)
  }, [])

  return {
    refreshParams,
    loginSession,
    logout,
    getLoginSession,
  }
}

export default useAuth
