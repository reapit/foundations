import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { authLogin, authLoginFailure, authLoginSuccess, authLogoutSuccess } from '../actions/auth'

export interface AuthState {
  isLogin: boolean
  error: boolean
}

export const defaultState: AuthState = {
  isLogin: !!window.localStorage.getItem('token'),
  error: false
}

const authReducer = (state: AuthState = defaultState, action: Action<any>): AuthState => {
  if (isType(action, authLogin)) {
    return {
      error: false,
      isLogin: false
    }
  }

  if (isType(action, authLoginSuccess)) {
    return {
      error: false,
      isLogin: true
    }
  }

  if (isType(action, authLoginFailure)) {
    return {
      error: true,
      isLogin: false
    }
  }

  if (isType(action, authLogoutSuccess)) {
    return {
      error: false,
      isLogin: false
    }
  }

  return state
}

export default authReducer
