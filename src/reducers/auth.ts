import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  authLogin,
  authLoginFailure,
  authLoginSuccess,
  authLogoutSuccess,
  authChangeLoginType,
  authSetDesktopSession
} from '../actions/auth'
import { getLoginSession } from '../utils/session'
import { RefreshParams, LoginType, LoginSession } from '@reapit/elements'

export interface AuthState {
  isLogin: boolean
  error: boolean
  loginType: LoginType
  loginSession: LoginSession | null
  desktopSession: RefreshParams | null
}

export const defaultState = (): AuthState => {
  const loginSession = getLoginSession()
  return {
    isLogin: !!loginSession,
    error: false,
    loginType: loginSession ? loginSession.loginType : 'CLIENT',
    loginSession,
    desktopSession: null
  }
}

const authReducer = (state: AuthState = defaultState(), action: Action<any>): AuthState => {
  if (isType(action, authLogin)) {
    return {
      ...state,
      error: false,
      isLogin: false
    }
  }

  if (isType(action, authLoginSuccess)) {
    return {
      ...state,
      error: false,
      isLogin: true,
      loginSession: action.data
    }
  }

  if (isType(action, authLoginFailure)) {
    return {
      ...state,
      error: true,
      isLogin: false
    }
  }

  if (isType(action, authLogoutSuccess)) {
    return {
      ...state,
      error: false,
      isLogin: false
    }
  }

  if (isType(action, authChangeLoginType)) {
    return {
      ...state,
      loginType: action.data
    }
  }

  if (isType(action, authSetDesktopSession)) {
    return {
      ...state,
      desktopSession: action.data
    }
  }

  return state
}

export default authReducer
