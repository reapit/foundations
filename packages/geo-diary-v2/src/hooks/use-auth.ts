import * as React from 'react'
import { COOKIE_SESSION_KEY as COGNITIO_COOKIE_SESSION_KEY } from '@reapit/cognito-auth'
import {
  LoginSession,
  RefreshParams,
  removeSession,
  getSession,
  redirectToLogout,
  getTokenFromQueryString,
  getSessionCookie,
} from '@reapit/cognito-auth'

export const COOKIE_SESSION_KEY = `${COGNITIO_COOKIE_SESSION_KEY}-geo-diary-v2`

export type AuthHook = {
  loginSession?: LoginSession | null
  logout: () => void
  getLoginSession: (refreshParams: RefreshParams | null) => Promise<void>
  refreshParams?: RefreshParams | null
  isFetchSession: boolean
}

export const useAuth = (): AuthHook => {
  const [isFetchSession, setFetchSession] = React.useState(false)
  const [loginSession, setLoginSession] = React.useState<LoginSession | null>(null)
  const urlParams: RefreshParams | null = getTokenFromQueryString(
    window.location.search,
    window.reapit.config.cognitoClientId,
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
    redirectToLogout(window.reapit.config.cognitoClientId, `${window.location.origin}/login`)
  }, [])

  return {
    refreshParams,
    loginSession,
    getLoginSession,
    logout,
    isFetchSession,
  }
}

export default useAuth
