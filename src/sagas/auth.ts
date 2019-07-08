import { takeLatest, put, call, take, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { authLoginSuccess, authLoginFailure, authLogoutSuccess, AuthLoginParams } from '../actions/auth'
import { Action } from '@/types/core.ts'

export const doLogin = function*(params: Action<AuthLoginParams>) {
  try {
    window.localStorage.setItem('token', 'XXXXXXXXXX')
    window.localStorage.setItem('loginType', params.data.loginType)
    yield put(authLoginSuccess())
  } catch (err) {
    yield put(authLoginFailure())
    console.error(err.message)
  }
}

export const doLogout = function*() {
  try {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('loginType')
    yield put(authLogoutSuccess())
  } catch (err) {
    console.error(err.message)
  }
}

export const loginListen = function*() {
  const params: Action<AuthLoginParams> = yield take(ActionTypes.AUTH_LOGIN)
  yield call(doLogin, params)
}

export const logoutListen = function*() {
  yield takeLatest(ActionTypes.AUTH_LOGOUT, doLogout)
}

const authSaga = function*() {
  yield all([loginListen(), logoutListen()])
}

export default authSaga
