import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  authLogin,
  authLoginFailure,
  authLoginSuccess,
  authLogoutSuccess,
  authSetRefreshSession,
} from '../actions/auth'
import { LoginSession, RefreshParams, LoginType } from '@reapit/cognito-auth'

export interface AuthState {
  error: boolean
  firstLogin?: boolean
  loginType: LoginType
  loginSession: LoginSession | null
  refreshSession: RefreshParams | null
}

export const defaultState: AuthState = {
  error: false,
  loginSession: null,
  loginType: 'ADMIN' as LoginType,
  refreshSession: null,
}

const authReducer = (state: AuthState = defaultState, action: Action<any>): AuthState => {
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

  if (isType(action, authLoginFailure)) {
    return {
      ...state,
      error: true,
    }
  }

  if (isType(action, authLogoutSuccess)) {
    return {
      ...defaultState,
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

  return state
}

export default authReducer
