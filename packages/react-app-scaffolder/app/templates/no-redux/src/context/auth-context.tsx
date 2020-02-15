import * as React from 'react'
import { LoginSession, RefreshParams, removeSession } from '@reapit/cognito-auth'
import { history } from '@/core/router'
import createContext from '.'
import Routes from '@/constants/routes'

export interface AuthState {
  loginSession: LoginSession | null
  refreshSession: RefreshParams | null
}

export const defaultState: AuthState = {
  loginSession: null,
  refreshSession: null,
}

const useAuth = () => {
  const [state, setState] = React.useState<AuthState>(defaultState)

  const setRefreshSession = React.useCallback(
    (refreshParams: RefreshParams) =>
      setState({
        ...state,
        refreshSession: refreshParams,
      }),
    [],
  )

  const logout = React.useCallback(() => {
    removeSession()
    history.push(Routes.LOGIN)
    setState(defaultState)
  }, [])

  return { ...state, logout, setRefreshSession }
}

export const [AuthProvider, useAuthContext] = createContext(useAuth)
