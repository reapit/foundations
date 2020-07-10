import { takeLatest, put, call, all } from '@redux-saga/core/effects'
import { Action } from '@/types/core.ts'
import ActionTypes from '@/constants/action-types'
import { authLoginSuccess, authLoginFailure } from '@/actions/auth'
import { LoginParams, LoginSession, setUserSession, removeSession, redirectToLogout } from '@reapit/cognito-auth'
import { COOKIE_SESSION_KEY } from '../constants/api'

export const doLogin = function*({ data }: Action<LoginParams>) {
  try {
    const loginSession: LoginSession | null = yield call(setUserSession, data)

    if (loginSession) {
      yield put(authLoginSuccess(loginSession))
    } else {
      yield put(authLoginFailure())
    }
  } catch (err) {
    console.error(err.message)
    yield put(authLoginFailure())
  }
}

export const doLogout = function*() {
  try {
    yield call(removeSession, COOKIE_SESSION_KEY)
    yield call(redirectToLogout, window.reapit.config.cognitoClientId, `${window.location.origin}/login`)
  } catch (err) {
    console.error(err.message)
  }
}

export const loginListen = function*() {
  yield takeLatest(ActionTypes.AUTH_LOGIN, doLogin)
}

export const logoutListen = function*() {
  yield takeLatest(ActionTypes.AUTH_LOGOUT, doLogout)
}

const authSaga = function*() {
  yield all([loginListen(), logoutListen()])
}

export default authSaga
