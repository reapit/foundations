import { takeLatest, put, call, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { authLoginSuccess, authLoginFailure, authLogoutSuccess, AuthLoginParams } from '../actions/auth'
import { Action } from '@/types/core.ts'
import { cognitoLogin } from '../utils/cognito'
import { removeLoginSession, setLoginSession } from '../utils/session'
import { LoginSession, LoginType } from '../reducers/auth'
import { history } from '../core/router'
import Routes from '../constants/routes'

export const doLogin = function*({ data }: Action<AuthLoginParams>) {
  try {
    const { email, password, loginType } = data
    const loginDetails: LoginSession = yield call(cognitoLogin, {
      userName: email,
      password: password,
      loginType
    })

    yield setLoginSession(loginDetails)
    yield put(authLoginSuccess(loginDetails))
  } catch (err) {
    console.error(err.message)
    yield put(authLoginFailure())
  }
}

export const doLogout = function*({ data }: Action<LoginType>) {
  try {
    yield removeLoginSession()
    yield put(authLogoutSuccess())
    yield history.push(data !== 'ADMIN' ? Routes.LOGIN : Routes.ADMIN_LOGIN)
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
