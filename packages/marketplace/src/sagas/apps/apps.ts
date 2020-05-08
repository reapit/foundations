import { ClientAppDetailParams, clientAppDetailReceiveData, clientAppDetailRequestFailure } from '@/actions/client'
import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { logger } from 'logger'
import { fetchAppApiKey, fetchAppDetail } from '@/services/apps'

export const fetchAppDetailSaga = function*({ data }: Action<ClientAppDetailParams>) {
  try {
    const appDetailResponse = yield call(fetchAppDetail, { clientId: data.clientId, id: data.id })
    console.log('appDetailResponse', appDetailResponse)
    if (appDetailResponse?.isWebComponent && appDetailResponse?.installationId) {
      const apiKeyResponse = yield call(fetchAppApiKey, { installationId: appDetailResponse.installationId })
      appDetailResponse.apiKey = apiKeyResponse?.apiKey || ''
    }
    yield put(clientAppDetailReceiveData(appDetailResponse))
  } catch (err) {
    logger(err)
    yield put(clientAppDetailRequestFailure(err.message))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const clientAppDetailDataListen = function*() {
  yield takeLatest<Action<ClientAppDetailParams>>(ActionTypes.CLIENT_APP_DETAIL_REQUEST_DATA, fetchAppDetailSaga)
}

const appDetailSagas = function*() {
  yield all([fork(clientAppDetailDataListen)])
}

export default appDetailSagas
