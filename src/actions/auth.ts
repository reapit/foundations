import ActionTypes from '@/constants/action-types'
import { actionCreator } from '@/utils/actions'
import { LoginSession, RefreshParams, LoginParams } from '@reapit/cognito-auth'

export const authLogin = actionCreator<LoginParams>(ActionTypes.AUTH_LOGIN)
export const authLoginSuccess = actionCreator<LoginSession>(ActionTypes.AUTH_LOGIN_SUCCESS)
export const authLoginFailure = actionCreator<void>(ActionTypes.AUTH_LOGIN_FAILURE)
export const authLogout = actionCreator<void>(ActionTypes.AUTH_LOGOUT)
export const authLogoutSuccess = actionCreator<void>(ActionTypes.AUTH_LOGOUT_SUCCESS)
export const authSetRefreshSession = actionCreator<RefreshParams>(ActionTypes.AUTH_SET_REFRESH_SESSION)
