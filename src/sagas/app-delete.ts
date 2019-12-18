import { fetcher } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS } from '../constants/api'
import { appDeleteRequestSuccess, appDeleteRequestLoading, appDeleteRequestFailure } from '@/actions/app-delete'
import { put, call, takeLatest } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'

export const appDeleteRequestSaga = function*({ data: appId }: Action<string>) {
  try {
    yield put(appDeleteRequestLoading())

    yield call(fetcher, {
      url: `${URLS.apps}/${appId}`,
      api: process.env.MARKETPLACE_API_BASE_URL as string,
      method: 'DELETE',
      headers: MARKETPLACE_HEADERS
    })
    yield put(appDeleteRequestSuccess())
  } catch (err) {
    yield put(appDeleteRequestFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const appDeleteRequestListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.APP_DELETE_REQUEST, appDeleteRequestSaga)
}

export default appDeleteRequestListen
