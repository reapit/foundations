import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { authLogin, authLoginFailure, authLoginSuccess, authLogoutSuccess, authSetRefreshSession } from '@/actions/auth'
import { RefreshParams, LoginSession, getSessionCookie } from '@reapit/cognito-auth'
import { COOKIE_SESSION_KEY_LTL_APP } from '../constants/api'
import config from '../../config.json'

export interface AuthState {
  error: boolean
  loginSession: LoginSession | null
  refreshSession: RefreshParams | null
}

export const defaultState = (): AuthState => {
  // window.config.reapit is undefined here, need to directly import from config.json
  const refreshSession = getSessionCookie(COOKIE_SESSION_KEY_LTL_APP, config.appEnv)
  return {
    error: false,
    loginSession: null,
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
      refreshSession: action.data,
    }
  }

  return state
}

export default authReducer
