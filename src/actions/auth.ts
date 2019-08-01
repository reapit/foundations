import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { LoginType, LoginSession } from '../reducers/auth'
import { RefreshParams } from '../utils/cognito'

export interface AuthLoginParams {
  email: string
  password: string
  loginType: LoginType
}

export const authLogin = actionCreator<AuthLoginParams>(ActionTypes.AUTH_LOGIN)
export const authLoginSuccess = actionCreator<LoginSession>(ActionTypes.AUTH_LOGIN_SUCCESS)
export const authLoginFailure = actionCreator<void>(ActionTypes.AUTH_LOGIN_FAILURE)
export const authLogout = actionCreator<LoginType>(ActionTypes.AUTH_LOGOUT)
export const authLogoutSuccess = actionCreator<void>(ActionTypes.AUTH_LOGOUT_SUCCESS)
export const authChangeLoginType = actionCreator<LoginType>(ActionTypes.AUTH_CHANGE_LOGIN_TYPE)
export const authSetDesktopSession = actionCreator<RefreshParams>(ActionTypes.AUTH_SET_DESKTOP_SESSION)
