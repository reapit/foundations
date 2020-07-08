import { takeLatest, put, call, all, fork } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { authLoginSuccess, authLoginFailure, authLogoutSuccess, setTermsAcceptedState } from '../actions/auth'
import { Action } from '@/types/core.ts'
import { LoginSession, LoginParams, setUserSession, removeSession, redirectToLogout } from '@reapit/cognito-auth'
import { getAuthRoute } from '@/utils/auth-route'
import { getCookieString, setCookieString, COOKIE_CLIENT_TERMS_ACCEPTED, COOKIE_MAX_AGE_INFINITY } from '@/utils/cookie'
import { COOKIE_SESSION_KEY_MARKETPLACE } from '../constants/api'
import { logger } from '@reapit/utils'

export const doLogin = function*({ data }: Action<LoginParams>) {
  try {
    const loginSession: LoginSession | null = yield call(setUserSession, data)
    if (loginSession) {
      yield put(authLoginSuccess(loginSession))
    } else {
      yield put(authLoginFailure())
    }
  } catch (err) {
    logger(err)
    yield put(authLoginFailure())
  }
}

export const doLogout = function*() {
  try {
    const authRoute = getAuthRoute()

    yield call(removeSession, COOKIE_SESSION_KEY_MARKETPLACE, window.reapit.config.appEnv)
    yield call(redirectToLogout, window.reapit.config.cognitoClientId, `${window.location.origin}${authRoute}`)
  } catch (err) {
    logger(err)
  }
}

export const clearAuth = function*() {
  try {
    yield call(removeSession)
    yield put(authLogoutSuccess())
  } catch (err) {
    logger(err)
  }
}

export const setInitClientTermsAcceptedStateFromCookie = function*() {
  const isTermAccepted = yield call(getCookieString, COOKIE_CLIENT_TERMS_ACCEPTED)
  yield put(setTermsAcceptedState(!!isTermAccepted))
}

export const setClientTermAcceptedCookieAndState = function*({ data: isAccepted }) {
  if (isAccepted) {
    yield call(setCookieString, COOKIE_CLIENT_TERMS_ACCEPTED, new Date(), COOKIE_MAX_AGE_INFINITY)
  }
  yield put(setTermsAcceptedState(isAccepted))
}

export const loginListen = function*() {
  yield takeLatest(ActionTypes.AUTH_LOGIN, doLogin)
}

export const logoutListen = function*() {
  yield takeLatest(ActionTypes.AUTH_LOGOUT, doLogout)
}

export const clearAuthListen = function*() {
  yield takeLatest(ActionTypes.AUTH_CLEAR, clearAuth)
}

export const setInitClientTermsAcceptedStateFromCookieListen = function*() {
  yield takeLatest(
    ActionTypes.SET_INIT_CLIENT_TERMS_ACCEPTED_STATE_FROM_COOKIE,
    setInitClientTermsAcceptedStateFromCookie,
  )
}

export const setClientTermAcceptedCookieAndStateListen = function*() {
  yield takeLatest<Action<boolean>>(
    ActionTypes.SET_CLIENT_TERM_ACCEPTED_COOKIE_AND_STATE,
    setClientTermAcceptedCookieAndState,
  )
}

const authSaga = function*() {
  yield all([
    fork(loginListen),
    fork(logoutListen),
    fork(clearAuthListen),
    fork(setInitClientTermsAcceptedStateFromCookieListen),
    fork(setClientTermAcceptedCookieAndStateListen),
  ])
}

export default authSaga
