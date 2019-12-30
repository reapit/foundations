import { fetcher } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS } from '../constants/api'
import {
  appDetailLoading,
  appDetailReceiveData,
  appDetailFailure,
  AppDetailParams,
  requestAuthenticationSuccess,
  requestAuthenticationFailure
} from '../actions/app-detail'
import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { Action } from '@/types/core'

export const appDetailDataFetch = function*({ data }: Action<AppDetailParams>) {
  const { id, clientId } = data
  yield put(appDetailLoading(true))
  try {
    const response = yield call(fetcher, {
      url: clientId ? `${URLS.apps}/${id}?clientId=${clientId}` : `${URLS.apps}/${id}`,
      api: process.env.MARKETPLACE_API_BASE_URL as string,
      method: 'GET',
      headers: MARKETPLACE_HEADERS
    })
    if (response) {
      yield put(appDetailReceiveData({ data: response }))
    } else {
      yield put(appDetailFailure())
    }
  } catch (err) {
    console.error(err.message)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const fetchAuthCode = id =>
  fetcher({
    url: `${URLS.apps}/${id}/secret`,
    api: process.env.MARKETPLACE_API_BASE_URL as string,
    method: 'GET',
    headers: MARKETPLACE_HEADERS
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
          message: errorMessages.DEFAULT_SERVER_ERROR
        })
      )
    }
  } catch (err) {
    console.error(err.message)
    yield put(requestAuthenticationFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
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
