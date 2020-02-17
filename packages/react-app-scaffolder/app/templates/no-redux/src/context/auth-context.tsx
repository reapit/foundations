import * as React from 'react'
import {
  LoginSession,
  RefreshParams,
  removeSession,
  getSession,
  redirectToLogout,
} from '@reapit/cognito-auth'
import createContext from '.'
import { COOKIE_SESSION_KEY } from '../constants/api'

export interface AuthState {
  loginSession: LoginSession | null
  fetching: boolean
}

export interface AuthContext extends AuthState {
  logout: () => void
  getLoginSession: (refreshParams: RefreshParams | null) => Promise<void>
  setAuthState: (newState: Partial<AuthState>) => void
}

export const defaultState: AuthState = {
  loginSession: null,
  fetching: false,
}

const useAuth = (): AuthContext => {
  const [state, setState] = React.useState<AuthState>(defaultState)

  const setAuthState = (newState: Partial<AuthState>) => {
    setState({
      ...state,
      ...newState,
    })
  }


  const getLoginSession = async (refreshParams: RefreshParams | null) => {
    const { loginSession, fetching  } = state

    if (fetching) return

    setAuthState({
      fetching: true
    })
  
    const newSession = await getSession(
      loginSession,
      refreshParams,
      COOKIE_SESSION_KEY
    )

    if (newSession !== loginSession) {

      setAuthState({
        fetching: false,
        loginSession: newSession
      })
  
    } else { 
      setAuthState({
        fetching: false
      })
    }
  } 

  const logout = React.useCallback(() => {
    removeSession(COOKIE_SESSION_KEY)
    redirectToLogout(process.env.process.env.COGNITO_CLIENT_ID_<%= nameInConstantCase %> as string, `${window.location.origin}/login`)
  }, [])

  return {
    ...state,
    logout,
    getLoginSession,
    setAuthState,
  }
}

export const [AuthProvider, useAuthContext] = createContext(useAuth)
