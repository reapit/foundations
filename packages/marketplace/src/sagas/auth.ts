import { takeLatest, put, call, all, fork, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import {
  authLoginSuccess,
  authLoginFailure,
  authLogoutSuccess,
  toggleFirstLogin,
  setTermsAcceptedState,
} from '../actions/auth'
import { Action } from '@/types/core.ts'
import { LoginSession, LoginParams, setUserSession, removeSession, redirectToLogout } from '@reapit/cognito-auth'
import store from '../core/store'
import { getAuthRouteByLoginType } from '@/utils/auth-route'
import {
  getCookieString,
  setCookieString,
  COOKIE_FIRST_TIME_LOGIN,
  COOKIE_TERMS_ACCEPTED,
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
    yield call(
      redirectToLogout,
      process.env.COGNITO_CLIENT_ID_MARKETPLACE as string,
      `${window.location.origin}${authRoute}`,
    )
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

export const checkFirstTimeLogin = function*() {
  const firstLoginCookie = yield call(getCookieString, COOKIE_FIRST_TIME_LOGIN)
  if (!firstLoginCookie) {
    // TODO need to get createdDate from api , refer to https://reapit.atlassian.net/browse/CLD-593
    yield put(toggleFirstLogin(true))
  }
}

export const setFirstTimeLogin = function*() {
  yield call(setCookieString, COOKIE_FIRST_TIME_LOGIN, new Date())
  yield put(toggleFirstLogin(false))
}

export const checkTermsAcceptedWithCookieHelper = function*() {
  const loginType = yield select(selectLoginType)
  // for now only check when login as developer
  if (loginType === 'DEVELOPER') {
    const isTermAccepted = yield call(getCookieString, COOKIE_TERMS_ACCEPTED)
    yield put(setTermsAcceptedState(!!isTermAccepted))
  }
}

export const setTermsAcceptedWithCookieHelper = function*({ data: isAccepted }) {
  if (isAccepted) {
    yield call(setCookieString, COOKIE_TERMS_ACCEPTED, new Date(), COOKIE_MAX_AGE_INFINITY)
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

export const checkFirstTimeLoginListen = function*() {
  yield takeLatest(ActionTypes.CHECK_FIRST_TIME_LOGIN, checkFirstTimeLogin)
}

export const setFirstLoginListen = function*() {
  yield takeLatest(ActionTypes.USER_ACCEPT_TERM_AND_CONDITION, setFirstTimeLogin)
}

export const checkTermsAcceptedListen = function*() {
  yield takeLatest(ActionTypes.CHECK_TERM_ACCEPTED_WITH_COOKIE, checkTermsAcceptedWithCookieHelper)
}

export const setTermsAcceptedListen = function*() {
  yield takeLatest<Action<boolean>>(ActionTypes.SET_TERMS_ACCEPTED_WITH_COOKIE, setTermsAcceptedWithCookieHelper)
}

const authSaga = function*() {
  yield all([
    fork(loginListen),
    fork(logoutListen),
    fork(clearAuthListen),
    fork(checkFirstTimeLoginListen),
    fork(setFirstLoginListen),
    fork(checkTermsAcceptedListen),
    fork(setTermsAcceptedListen),
  ])
}

export default authSaga
