import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  authLogin,
  authLoginFailure,
  authLoginSuccess,
  authLogoutSuccess,
  authSetRefreshSession,
  authChangeLoginType,
  setTermsAcceptedState,
} from '../actions/auth'
import { LoginSession, RefreshParams, LoginType, getSessionCookie } from '@reapit/cognito-auth'
import { COOKIE_SESSION_KEY_MARKETPLACE } from '../constants/api'
import config from '../../config.json'

export interface AuthState {
  error: boolean

  firstLogin?: boolean

  loginType: LoginType
  loginSession: LoginSession | null
  refreshSession: RefreshParams | null

  /**
   * state for
   * developer, client welcome modal
   */
  isTermAccepted: boolean
}

export const defaultState = (): AuthState => {
  // window.config.reapit is undefined here, need to directly import from config.json
  const refreshSession = getSessionCookie(COOKIE_SESSION_KEY_MARKETPLACE, config.appEnv)
  return {
    error: false,
    loginSession: null,
    isTermAccepted: false,
    loginType: refreshSession ? refreshSession.loginType : 'DEVELOPER',
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

  if (isType(action, setTermsAcceptedState)) {
    return {
      ...state,
      isTermAccepted: action.data,
    }
  }
  return state
}

export default authReducer
