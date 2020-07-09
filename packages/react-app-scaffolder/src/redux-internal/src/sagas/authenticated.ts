import {
  authenticatedLoading,
  authenticatedReceiveData,
  authenticatedRequestDataFailure,
} from '../actions/authenticated'
import { put, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { Action } from '@/types/core'

export const authenticatedDataFetch = function*() {
  yield put(authenticatedLoading(true))

  try {
    const response = yield true // Your fetch module here

    yield put(authenticatedReceiveData({ data: response }))
  } catch (err) {
    console.error(err.message)
    yield put(authenticatedRequestDataFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const authenticatedDataListen = function*() {
  yield takeLatest<Action<number>>(ActionTypes.AUTHENTICATED_REQUEST_DATA, authenticatedDataFetch)
}

const authenticatedSagas = function*() {
  yield all([fork(authenticatedDataListen)])
}

export default authenticatedSagas
