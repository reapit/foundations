import {
  authenticatedLoading,
  authenticatedReceiveData,
  authenticatedRequestDataFailure,
} from '../actions/authenticated'
import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { notification } from '@reapit/elements'
import errorMessages from '../constants/error-messages'
import { Action } from '@/types/core'

export const authenticatedDataFetch = function*() {
  yield put(authenticatedLoading(true))

  try {
    const response = yield true // Your fetch module here

    yield put(authenticatedReceiveData({ data: response }))
  } catch (err) {
    yield put(authenticatedRequestDataFailure())
    yield call(notification.error, {
      message: err?.description ?? errorMessages.DEFAULT_SERVER_ERROR,
    })
  }
}

export const authenticatedDataListen = function*() {
  yield takeLatest<Action<number>>(ActionTypes.AUTHENTICATED_REQUEST_DATA, authenticatedDataFetch)
}

const authenticatedSagas = function*() {
  yield all([fork(authenticatedDataListen)])
}

export default authenticatedSagas
