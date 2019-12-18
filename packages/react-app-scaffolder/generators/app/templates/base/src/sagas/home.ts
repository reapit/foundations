import { homeLoading, homeReceiveData, homeRequestDataFailure } from '../actions/home'
import { put, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { Action } from '@/types/core'

export const homeDataFetch = function*() {
  yield put(homeLoading(true))

  try {
    const response = yield true // Your fetch module here

    yield put(homeReceiveData({ data: response }))
  } catch (err) {
    console.error(err.message)
    yield put(homeRequestDataFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const homeDataListen = function*() {
  yield takeLatest<Action<number>>(ActionTypes.HOME_REQUEST_DATA, homeDataFetch)
}

const homeSagas = function*() {
  yield all([fork(homeDataListen)])
}

export default homeSagas
