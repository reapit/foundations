import { fetcher } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS, REAPIT_API_BASE_URL } from '../constants/api'
import { appDeleteRequestSuccess, appDeleteRequestLoading, appDeleteRequestFailure } from '@/actions/app-delete'
import { developerRequestData } from '@/actions/developer'
import { put, call, takeLatest, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { selectAppDetailId } from '@/selector/app-detail'
import { developerAppShowModal } from '@/actions/developer-app-modal'

export const appDeleteRequestSaga = function*() {
  try {
    const appId = yield select(selectAppDetailId)

    if (!appId) {
      throw new Error('appId not exist')
    }

    yield put(appDeleteRequestLoading())

    yield call(fetcher, {
      url: `${URLS.apps}/${appId}`,
      api: REAPIT_API_BASE_URL,
      method: 'DELETE',
      headers: MARKETPLACE_HEADERS
    })
    yield put(appDeleteRequestSuccess())
    yield put(developerRequestData(1))
  } catch (err) {
    yield put(appDeleteRequestFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  } finally {
    yield put(developerAppShowModal(false))
  }
}

export const appDeleteRequestListen = function*() {
  yield takeLatest<Action<void>>(ActionTypes.APP_DELETE_REQUEST, appDeleteRequestSaga)
}

export default appDeleteRequestListen
