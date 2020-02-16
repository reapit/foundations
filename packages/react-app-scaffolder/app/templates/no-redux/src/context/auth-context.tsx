import * as React from 'react'
import { LoginSession, RefreshParams, removeSession, getSession, getSessionCookie } from '@reapit/cognito-auth'
import { history } from '@/core/router'
import createContext from '.'
import Routes from '@/constants/routes'
import { COOKIE_SESSION_KEY } from '../constants/api'

export interface AuthState {
  loginSession: LoginSession | null
  refreshSession: RefreshParams | null
}

export interface AuthContext extends AuthState {
  logout: () => void
  setRefreshSession: (refreshParams: RefreshParams) => void
  getLoginSession: () => Promise<void>
}

export const defaultState: AuthState = {
  loginSession: null,
  refreshSession: getSessionCookie(COOKIE_SESSION_KEY),
}

const useAuth = (): AuthContext => {
  const [state, setState] = React.useState<AuthState>(defaultState)

  const getLoginSession = React.useCallback(async () => {
    const loginSession = await getSession(state.loginSession, state.refreshSession, COOKIE_SESSION_KEY)

    setState({
      ...state,
      loginSession,
    })
  }, [])

  const setRefreshSession = React.useCallback((refreshParams: RefreshParams) => {
    setState({
      ...state,
      refreshSession: refreshParams,
    })
  }, [])

  const logout = React.useCallback(() => {
    removeSession()
    history.push(Routes.LOGIN)
    setState(defaultState)
  }, [])

  return { ...state, logout, setRefreshSession, getLoginSession }
}

export const [AuthProvider, useAuthContext] = createContext(useAuth)
