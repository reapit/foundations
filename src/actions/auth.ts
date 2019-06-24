import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'

export const authLogin = actionCreator<void>(ActionTypes.AUTH_LOGIN)
export const authLoginSuccess = actionCreator<void>(ActionTypes.AUTH_LOGIN_SUCCESS)
export const authLoginFailure = actionCreator<void>(ActionTypes.AUTH_LOGIN_FAILURE)
export const authLogout = actionCreator<void>(ActionTypes.AUTH_LOGOUT)
export const authLogoutSuccess = actionCreator<void>(ActionTypes.AUTH_LOGOUT_SUCCESS)
