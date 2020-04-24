import { takeLatest, put, call, all, fork, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { authLoginSuccess, authLoginFailure, authLogoutSuccess, setTermsAcceptedState } from '../actions/auth'
import { Action } from '@/types/core.ts'
import { LoginSession, LoginParams, setUserSession, removeSession, redirectToLogout } from '@reapit/cognito-auth'
import store from '../core/store'
import { getAuthRouteByLoginType } from '@/utils/auth-route'
import {
  getCookieString,
  setCookieString,
  COOKIE_DEVELOPER_TERMS_ACCEPTED,
  COOKIE_CLIENT_TERMS_ACCEPTED,
  COOKIE_MAX_AGE_INFINITY,
} from '@/utils/cookie'
import { COOKIE_SESSION_KEY_MARKETPLACE } from '../constants/api'
import { selectLoginType } from '@/selector/auth'
import { logger } from 'logger'

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
    const loginType = store?.state?.auth?.loginSession?.loginType || 'CLIENT'
    const authRoute = getAuthRouteByLoginType(loginType)

    yield call(removeSession, COOKIE_SESSION_KEY_MARKETPLACE)
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

export const setInitDeveloperTermsAcceptedStateFromCookie = function*() {
  const loginType = yield select(selectLoginType)

  if (loginType === 'DEVELOPER') {
    const isTermAccepted = yield call(getCookieString, COOKIE_DEVELOPER_TERMS_ACCEPTED)
    yield put(setTermsAcceptedState(!!isTermAccepted))
  }
}

export const setDeveloperTermAcceptedCookieAndState = function*({ data: isAccepted }) {
  if (isAccepted) {
    yield call(setCookieString, COOKIE_DEVELOPER_TERMS_ACCEPTED, new Date(), COOKIE_MAX_AGE_INFINITY)
  }
  yield put(setTermsAcceptedState(isAccepted))
}

export const setInitClientTermsAcceptedStateFromCookie = function*() {
  const loginType = yield select(selectLoginType)
  // for now only check when login as developer
  if (loginType === 'CLIENT') {
    const isTermAccepted = yield call(getCookieString, COOKIE_CLIENT_TERMS_ACCEPTED)
    yield put(setTermsAcceptedState(!!isTermAccepted))
  }
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

export const setInitDeveloperTermsAcceptedStateFromCookieListen = function*() {
  yield takeLatest(
    ActionTypes.SET_INIT_DEVELOPER_TERMS_ACCEPTED_STATE_FROM_COOKIE,
    setInitDeveloperTermsAcceptedStateFromCookie,
  )
}

export const setDeveloperTermAcceptedCookieAndStateListen = function*() {
  yield takeLatest<Action<boolean>>(
    ActionTypes.SET_DEVELOPER_TERM_ACCEPTED_COOKIE_AND_STATE,
    setDeveloperTermAcceptedCookieAndState,
  )
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
    fork(setInitDeveloperTermsAcceptedStateFromCookieListen),
    fork(setDeveloperTermAcceptedCookieAndStateListen),
    fork(setInitClientTermsAcceptedStateFromCookieListen),
    fork(setClientTermAcceptedCookieAndStateListen),
  ])
}

export default authSaga
