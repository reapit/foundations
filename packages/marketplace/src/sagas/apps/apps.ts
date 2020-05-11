import { clientFetchAppDetailSuccess, clientFetchAppDetailFailed } from '@/actions/client'
import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { logger } from 'logger'
import { fetchAppApiKey, fetchAppDetail, FetchAppDetailParams } from '@/services/apps'
import { developerFetchAppDetailSuccess, developerFetchAppDetailFailed } from '@/actions/developer'

export const fetchClientAppDetailSaga = function*({ data }: Action<FetchAppDetailParams>) {
  try {
    const appDetailResponse = yield call(fetchAppDetail, { clientId: data.clientId, id: data.id })
    if (appDetailResponse?.isWebComponent && appDetailResponse?.installationId) {
      const apiKeyResponse = yield call(fetchAppApiKey, { installationId: appDetailResponse.installationId })
      appDetailResponse.apiKey = apiKeyResponse?.apiKey || ''
    }
    yield put(clientFetchAppDetailSuccess(appDetailResponse))
  } catch (err) {
    logger(err)
    yield put(clientFetchAppDetailFailed(err.message))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const fetchDeveloperAppDetailSaga = function*({ data }: Action<FetchAppDetailParams>) {
  try {
    const appDetailResponse = yield call(fetchAppDetail, { clientId: data.clientId, id: data.id })
    if (appDetailResponse?.isWebComponent && appDetailResponse?.installationId) {
      const apiKeyResponse = yield call(fetchAppApiKey, { installationId: appDetailResponse.installationId })
      appDetailResponse.apiKey = apiKeyResponse?.apiKey || ''
    }
    yield put(developerFetchAppDetailSuccess(appDetailResponse))
  } catch (err) {
    logger(err)
    yield put(developerFetchAppDetailFailed(err.message))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const clientAppDetailDataListen = function*() {
  yield takeLatest<Action<FetchAppDetailParams>>(ActionTypes.CLIENT_FETCH_APP_DETAIL, fetchClientAppDetailSaga)
}

export const developerAppDetailDataListen = function*() {
  yield takeLatest<Action<FetchAppDetailParams>>(ActionTypes.DEVELOPER_FETCH_APP_DETAIL, fetchDeveloperAppDetailSaga)
}

const appDetailSagas = function*() {
  yield all([fork(clientAppDetailDataListen), fork(developerAppDetailDataListen)])
}

export default appDetailSagas
