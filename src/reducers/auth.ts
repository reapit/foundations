import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  authLogin,
  authLoginFailure,
  authLoginSuccess,
  authLogoutSuccess,
  authSetRefreshSession,
  authChangeLoginType
} from '../actions/auth'
import { LoginSession, RefreshParams, getSessionCookie, LoginType } from '@reapit/cognito-auth'

export interface AuthState {
  error: boolean
  loginType: LoginType
  loginSession: LoginSession | null
  refreshSession: RefreshParams | null
}

export const defaultState = (): AuthState => {
  const refreshSession = getSessionCookie()

  return {
    error: false,
    loginSession: null,
    loginType: refreshSession ? refreshSession.loginType : 'CLIENT',
    refreshSession
  }
}

const authReducer = (state: AuthState = defaultState(), action: Action<any>): AuthState => {
  if (isType(action, authLogin)) {
    return {
      ...state,
      error: false
    }
  }

  if (isType(action, authLoginSuccess)) {
    return {
      ...state,
      error: false,
      loginSession: action.data
    }
  }

  if (isType(action, authLoginFailure)) {
    return {
      ...state,
      error: true
    }
  }

  if (isType(action, authLogoutSuccess)) {
    return defaultState()
  }

  if (isType(action, authSetRefreshSession)) {
    return {
      ...state,
      refreshSession: action.data
    }
  }

  if (isType(action, authChangeLoginType)) {
    return {
      ...state,
      loginType: action.data
    }
  }

  return state
}

export default authReducer
