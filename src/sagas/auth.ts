import { takeLatest, put, call, all } from '@redux-saga/core/effects'
import { history } from '@/core/router'
import { Action } from '@/types/core.ts'
import Routes from '@/constants/routes'
import ActionTypes from '@/constants/action-types'
import { authLoginSuccess, authLoginFailure, authLogoutSuccess } from '@/actions/auth'
import { removeLoginSession, setLoginSession } from '@/utils/session'
import {
  COGNITO_API_BASE_URL,
  COGNITO_HEADERS,
  deserializeIdToken,
  LoginSession,
  fetcher,
  LoginParams
} from '@reapit/elements'

export const doLogin = function*({ data }: Action<LoginParams>) {
  try {
    const { userName, password } = data

    const loginDetails: Partial<LoginSession> | undefined = yield call(fetcher, {
      api: COGNITO_API_BASE_URL,
      url: `/login`,
      method: 'POST',
      body: { userName, password },
      headers: COGNITO_HEADERS
    })
    if (!loginDetails) {
      yield put(authLoginFailure())
    }

    const loginIdentity = deserializeIdToken(loginDetails)
    if (!loginIdentity.clientId) {
      yield put(authLoginFailure())
    }

    const detailsWithLoginType = { ...loginDetails, userName, loginIdentity } as LoginSession

    yield call(setLoginSession, detailsWithLoginType)
    yield put(authLoginSuccess(detailsWithLoginType))
  } catch (err) {
    console.error(err.message)
    yield put(authLoginFailure())
  }
}

export const doLogout = function*() {
  try {
    yield removeLoginSession()
    yield put(authLogoutSuccess())
    yield history.push(Routes.LOGIN)
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
