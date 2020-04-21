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
import { getMarketplaceGlobalsByKey } from '@reapit/elements'
import config from '../../config.json'

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
    window.reapit.config.cognitoClientId,
  )
  const cookieParams: RefreshParams | null = getSessionCookie(COOKIE_SESSION_KEY)
  const refreshParamsRaw: RefreshParams | null = cookieParams ? cookieParams : urlParams
  const marketplaceGlobalObject = getMarketplaceGlobalsByKey()
  const refreshParams: RefreshParams | null = refreshParamsRaw && {
    ...refreshParamsRaw,
    mode: marketplaceGlobalObject ? 'DESKTOP' : 'WEB',
  }
  const getLoginSession = async () => {
    if (isFetchSession) return
    setFetchSession(true)
    const session = await getSession(loginSession, refreshParams, COOKIE_SESSION_KEY, window.reapit.config.appEnv)
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
    removeSession(COOKIE_SESSION_KEY, config.appEnv)
    redirectToLogout(window.reapit.config.cognitoClientId, `${window.location.origin}/login`)
  }, [])

  return {
    refreshParams,
    loginSession,
    logout,
    getLoginSession,
  }
}

export default useAuth
