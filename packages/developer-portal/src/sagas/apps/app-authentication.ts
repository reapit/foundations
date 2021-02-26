import { fetchtAppAuthentication, fetchtAppAuthenticationSuccess, fetchtAppAuthenticationFailed } from '@/actions/apps'
import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import { notification } from '@reapit/elements'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { fetchAppSecretByIdAPI } from '@/services/apps'

export const requestAuthCode = function* ({ data: id }: Action<string>) {
  try {
    const response = yield call(fetchAppSecretByIdAPI, { id })
    yield put(fetchtAppAuthenticationSuccess(response))
  } catch (err) {
    yield put(fetchtAppAuthenticationFailed(err?.description))
    yield call(notification.error, {
      message: err?.description ?? errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const requestAuthenticationCodeListen = function* () {
  yield takeLatest<Action<string>>(fetchtAppAuthentication.type, requestAuthCode)
}

const appAuthenticationSagas = function* () {
  yield all([fork(requestAuthenticationCodeListen)])
}

export default appAuthenticationSagas
