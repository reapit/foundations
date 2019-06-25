import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { LoginType } from '../reducers/auth'

export const authLogin = actionCreator<void>(ActionTypes.AUTH_LOGIN)
export const authLoginSuccess = actionCreator<void>(ActionTypes.AUTH_LOGIN_SUCCESS)
export const authLoginFailure = actionCreator<void>(ActionTypes.AUTH_LOGIN_FAILURE)
export const authLogout = actionCreator<void>(ActionTypes.AUTH_LOGOUT)
export const authLogoutSuccess = actionCreator<void>(ActionTypes.AUTH_LOGOUT_SUCCESS)
export const authChangeLoginType = actionCreator<LoginType>(ActionTypes.AUTH_CHANGE_LOGIN_TYPE)
