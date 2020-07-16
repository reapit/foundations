import { takeLatest, put, call, all, fork } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { authLoginSuccess, authLoginFailure, authLogoutSuccess } from '@/actions/auth'
import { Action } from '@/types/core.ts'
import { LoginSession, LoginParams, setUserSession, removeSession, redirectToLogout } from '@reapit/cognito-auth'
import { COOKIE_SESSION_KEY_MARKETPLACE } from '../constants/api'
import { logger } from '@reapit/utils'
import Routes from '../constants/routes'

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
    yield call(removeSession, COOKIE_SESSION_KEY_MARKETPLACE, window.reapit.config.appEnv)
    yield call(redirectToLogout, window.reapit.config.cognitoClientId, `${window.location.origin}${Routes.LOGIN}`)
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

export const loginListen = function*() {
  yield takeLatest(ActionTypes.AUTH_LOGIN, doLogin)
}

export const logoutListen = function*() {
  yield takeLatest(ActionTypes.AUTH_LOGOUT, doLogout)
}

export const clearAuthListen = function*() {
  yield takeLatest(ActionTypes.AUTH_CLEAR, clearAuth)
}

const authSaga = function*() {
  yield all([fork(loginListen), fork(logoutListen), fork(clearAuthListen)])
}

export default authSaga
