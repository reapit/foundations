import { takeLatest, put, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { authLoginSuccess, authLoginFailure, authLogoutSuccess } from '../actions/auth'

export const doLogin = function*() {
  try {
    window.localStorage.setItem('token', 'XXXXXXXXXX')
    yield put(authLoginSuccess())
  } catch (err) {
    yield put(authLoginFailure())
    console.error(err.message)
  }
}

export const doLogout = function*() {
  try {
    window.localStorage.removeItem('token')
    yield put(authLogoutSuccess())
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
