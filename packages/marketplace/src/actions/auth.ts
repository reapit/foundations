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

export const setInitDeveloperTermsAcceptedStateFromCookie = actionCreator<void>(
  ActionTypes.SET_INIT_DEVELOPER_TERMS_ACCEPTED_STATE_FROM_COOKIE,
)
export const setDeveloperTermAcceptedCookieAndState = actionCreator<boolean>(
  ActionTypes.SET_DEVELOPER_TERM_ACCEPTED_COOKIE_AND_STATE,
)

export const setInitClientTermsAcceptedStateFromCookie = actionCreator<void>(
  ActionTypes.SET_INIT_CLIENT_TERMS_ACCEPTED_STATE_FROM_COOKIE,
)

export const setClientTermAcceptedCookieAndState = actionCreator<boolean>(
  ActionTypes.SET_CLIENT_TERM_ACCEPTED_COOKIE_AND_STATE,
)

export const setTermsAcceptedState = actionCreator<boolean>(ActionTypes.SET_TERMS_ACCEPTED_STATE)
