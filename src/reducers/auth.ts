import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { authLogin, authLoginFailure, authLoginSuccess, authLogoutSuccess, authChangeLoginType } from '../actions/auth'
import { getLoginSession } from '../utils/session'
import jwt from 'jsonwebtoken'

export type LoginType = 'DEVELOPER' | 'CLIENT' | 'ADMIN'

export interface LoginIdentity {
  sub: string
  email_verified: boolean
  iss: string
  phone_number_verified: boolean
  'cognito:username': string
  'custom:reapit:developerId': string
  aud: string
  token_use: string
  auth_time: number
  name: string
  phone_number: string
  exp: number
  iat: number
  email: string
}

export interface LoginSession {
  userName: string
  accessToken: string
  accessTokenExpiry: number
  idToken: string
  idTokenExpiry: number
  refreshToken: string
  loginType: LoginType
}

export interface AuthState {
  isLogin: boolean
  error: boolean
  loginType: LoginType
  loginSession: LoginSession | null
  loginIdentity: LoginIdentity | null
}

export const defaultState = (): AuthState => {
  const loginSession = getLoginSession()
  return {
    isLogin: !!loginSession,
    error: false,
    loginType: loginSession ? loginSession.loginType : 'CLIENT',
    loginSession,
    loginIdentity: loginSession && loginSession.idToken ? (jwt.decode(loginSession.idToken) as LoginIdentity) : null
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
      loginSession: action.data,
      loginIdentity: jwt.decode(action.data.idToken) as LoginIdentity
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
