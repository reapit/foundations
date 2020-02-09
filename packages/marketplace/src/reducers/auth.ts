import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  authLogin,
  authLoginFailure,
  authLoginSuccess,
  authLogoutSuccess,
  authSetRefreshSession,
  authChangeLoginType,
  toggleFirstLogin,
} from '../actions/auth'
import { LoginSession, RefreshParams, LoginType, getSessionCookie } from '@reapit/cognito-auth'
import { COOKIE_SESSION_KEY_MARKETPLACE } from '../constants/api'

export interface AuthState {
  error: boolean
  firstLogin?: boolean
  loginType: LoginType
  loginSession: LoginSession | null
  refreshSession: RefreshParams | null
}

export const defaultState = (): AuthState => {
  const refreshSession = getSessionCookie(COOKIE_SESSION_KEY_MARKETPLACE)
  return {
    error: false,
    loginSession: null,
    firstLogin: false,
    loginType: 'CLIENT',
    refreshSession,
  }
}

const authReducer = (state: AuthState = defaultState(), action: Action<any>): AuthState => {
  if (isType(action, authLogin)) {
    return {
      ...state,
      error: false,
    }
  }

  if (isType(action, authLoginSuccess)) {
    return {
      ...state,
      error: false,
      loginSession: action.data,
    }
  }

  if (isType(action, toggleFirstLogin)) {
    return {
      ...state,
      firstLogin: action.data,
    }
  }

  if (isType(action, authLoginFailure)) {
    return {
      ...state,
      error: true,
    }
  }

  if (isType(action, authLogoutSuccess)) {
    return {
      ...defaultState(),
      refreshSession: null,
    }
  }

  if (isType(action, authSetRefreshSession)) {
    return {
      ...state,
      loginType: action.data.loginType,
      refreshSession: action.data,
    }
  }

  if (isType(action, authChangeLoginType)) {
    return {
      ...state,
      loginType: action.data,
    }
  }

  return state
}

export default authReducer
