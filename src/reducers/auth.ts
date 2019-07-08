import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { authLogin, authLoginFailure, authLoginSuccess, authLogoutSuccess, authChangeLoginType } from '../actions/auth'

export type LoginType = 'DEVELOPER' | 'CLIENT'

export interface AuthState {
  isLogin: boolean
  error: boolean
  loginType: LoginType
}

export const defaultState: AuthState = {
  isLogin: !!window.localStorage.getItem('token'),
  error: false,
  loginType: (window.localStorage.getItem('loginType') as LoginType) || 'CLIENT'
}

const authReducer = (state: AuthState = defaultState, action: Action<any>): AuthState => {
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
      isLogin: true
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

  return state
}

export default authReducer
