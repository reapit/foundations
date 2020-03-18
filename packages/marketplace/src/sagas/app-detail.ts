import { fetcher } from '@reapit/elements'
import { URLS, generateHeader } from '../constants/api'
import {
  appDetailLoading,
  appDetailReceiveData,
  appDetailFailure,
  AppDetailParams,
  requestAuthenticationSuccess,
  requestAuthenticationFailure,
  setAppDetailStale,
} from '../actions/app-detail'
import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { Action } from '@/types/core'
import { logger } from 'logger'

export const fetchAppDetail = async ({ clientId, id }) => {
  const response = await fetcher({
    url: clientId ? `${URLS.apps}/${id}?clientId=${clientId}` : `${URLS.apps}/${id}`,
    api: window.reapit.config.marketplaceApiUrl,
    method: 'GET',
    headers: generateHeader(window.reapit.config.marketplaceApiKey),
  })
  return response
}

export const appDetailDataFetch = function*({ data }: Action<AppDetailParams>) {
  yield put(appDetailLoading(true))
  try {
    const response = yield call(fetchAppDetail, { clientId: data.clientId, id: data.id })
    if (response) {
      yield put(appDetailReceiveData({ data: response }))

      yield put(setAppDetailStale(false))
    } else {
      yield put(appDetailFailure())
    }
  } catch (err) {
    logger(err)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const fetchAuthCode = id =>
  fetcher({
    url: `${URLS.apps}/${id}/secret`,
    api: window.reapit.config.marketplaceApiUrl,
    method: 'GET',
    headers: generateHeader(window.reapit.config.marketplaceApiKey),
  })

export const requestAuthCode = function*({ data: id }: Action<string>) {
  try {
    const response = yield call(fetchAuthCode, id)
    if (response && response.clientSecret) {
      yield put(requestAuthenticationSuccess(response))
    } else {
      yield put(requestAuthenticationFailure())
      yield put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      )
    }
  } catch (err) {
    logger(err)
    yield put(requestAuthenticationFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const appDetailDataListen = function*() {
  yield takeLatest<Action<AppDetailParams>>(ActionTypes.APP_DETAIL_REQUEST_DATA, appDetailDataFetch)
}

export const requestAuthenticationCodeListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.REQUEST_AUTHENTICATION_CODE, requestAuthCode)
}

const appDetailSagas = function*() {
  yield all([fork(appDetailDataListen), fork(requestAuthenticationCodeListen)])
}

export default appDetailSagas
