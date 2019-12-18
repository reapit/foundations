import { takeLatest, put, call, all } from '@redux-saga/core/effects'
import { history } from '@/core/router'
import { Action } from '@/types/core'
import Routes from '@/constants/routes'
import ActionTypes from '@/constants/action-types'
import { authLoginSuccess, authLoginFailure, authLogoutSuccess } from '@/actions/auth'
import { LoginSession, LoginParams, setUserSession, removeSession } from '@reapit/cognito-auth'

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
    yield call(removeSession)
    yield history.push(Routes.LOGIN)
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
