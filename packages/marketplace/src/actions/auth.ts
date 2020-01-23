import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { LoginType, LoginSession, RefreshParams, LoginParams } from '@reapit/cognito-auth'

export const authLogin = actionCreator<LoginParams>(ActionTypes.AUTH_LOGIN)
export const authLoginSuccess = actionCreator<LoginSession>(ActionTypes.AUTH_LOGIN_SUCCESS)
export const authLoginFailure = actionCreator<void>(ActionTypes.AUTH_LOGIN_FAILURE)
export const authLogout = actionCreator<void>(ActionTypes.AUTH_LOGOUT)
export const authLogoutSuccess = actionCreator<void>(ActionTypes.AUTH_LOGOUT_SUCCESS)
export const authSetRefreshSession = actionCreator<RefreshParams>(ActionTypes.AUTH_SET_REFRESH_SESSION)
export const authChangeLoginType = actionCreator<LoginType>(ActionTypes.AUTH_CHANGE_LOGIN_TYPE)
export const authClear = actionCreator<void>(ActionTypes.AUTH_CLEAR)
export const checkFirstTimeLogin = actionCreator<void>(ActionTypes.CHECK_FIRST_TIME_LOGIN)
export const toggleFirstLogin = actionCreator<boolean>(ActionTypes.TOGGLE_FIRST_LOGIN)
export const userAcceptTermAndCondition = actionCreator<void>(ActionTypes.USER_ACCEPT_TERM_AND_CONDITION)
