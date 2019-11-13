import { takeLatest, put, call, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { authLoginSuccess, authLoginFailure, authLogoutSuccess } from '../actions/auth'
import { Action } from '@/types/core.ts'
import { history } from '../core/router'
import Routes from '../constants/routes'
import { LoginSession, LoginParams, getCognitoSession, removeSessionCookie } from '@reapit/elements'
import store from '../core/store'

export const doLogin = function*({ data }: Action<LoginParams>) {
  try {
    const loginSession: LoginSession | null = yield call(getCognitoSession, data)

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
    const loginType = store?.state?.auth?.loginSession?.loginType || 'CLIENT'
    yield call(removeSessionCookie)
    yield history.push(loginType !== 'ADMIN' ? Routes.LOGIN : Routes.ADMIN_LOGIN)
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
