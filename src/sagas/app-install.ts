import { fetcher } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS, REAPIT_API_BASE_URL } from '../constants/api'
import { appInstallRequestSuccess, appInstallRequestDataFailure, appInstallLoading } from '@/actions/app-install'
import { appDetailRequestData } from '@/actions/app-detail'
import { put, fork, all, call, takeLatest, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { selectAppDetailId } from '@/selector/app-detail'
import { selectClientId, selectLoggedUserEmail } from '@/selector/client'
import { setAppDetailModalStateInstallSuccess } from '../actions/app-detail-modal'

export const appInstallSaga = function*() {
  try {
    yield put(appInstallLoading())
    const appId = yield select(selectAppDetailId)
    const email = yield select(selectLoggedUserEmail)
    const clientId = yield select(selectClientId)
    // const email = yield select(selectLoggedUserEmail)

    if (!clientId) {
      throw new Error('ClientId not exist')
    }

    yield call(fetcher, {
      url: `${URLS.installations}`,
      api: REAPIT_API_BASE_URL,
      method: 'POST',
      headers: MARKETPLACE_HEADERS,
      body: { appId, clientId, approvedBy: email }
    })
    yield put(appInstallRequestSuccess())
    yield put(setAppDetailModalStateInstallSuccess())
    yield put(
      appDetailRequestData({
        id: appId,
        clientId
      })
    )
  } catch (err) {
    yield put(appInstallRequestDataFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const appInstallDataListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.APP_INSTALL_REQUEST_DATA, appInstallSaga)
}

export const appInstallSagas = function*() {
  yield all([fork(appInstallDataListen)])
}

export default appInstallSagas
