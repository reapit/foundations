import { fetchtAppAuthentication, fetchtAppAuthenticationSuccess, fetchtAppAuthenticationFailed } from '@/actions/apps'
import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { fetchAppSecretByIdAPI } from '@/services/apps'

export const requestAuthCode = function*({ data: id }: Action<string>) {
  try {
    const response = yield call(fetchAppSecretByIdAPI, { id })
    yield put(fetchtAppAuthenticationSuccess(response))
  } catch (err) {
    yield put(fetchtAppAuthenticationFailed(err?.description))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const requestAuthenticationCodeListen = function*() {
  yield takeLatest<Action<string>>(fetchtAppAuthentication.type, requestAuthCode)
}

const appAuthenticationSagas = function*() {
  yield all([fork(requestAuthenticationCodeListen)])
}

export default appAuthenticationSagas
