import fetcher from '../utils/fetcher'
import { URLS } from '../constants/api'
import { homeLoading, homeReceiveData } from '../actions/home'
import { HomeItem } from '../reducers/home'
import { put, call, fork, takeEvery, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'

export const homeDataFetch = function*() {
  yield put(homeLoading(true))

  try {
    const redditData: HomeItem | undefined = yield call(fetcher, { url: URLS.react, method: 'GET' })

    yield put(homeReceiveData(redditData))
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

export const homeDataListen = function*() {
  yield takeEvery(ActionTypes.HOME_REQUEST_DATA, homeDataFetch)
}

const homeSagas = function*() {
  yield all([fork(homeDataListen)])
}

export default homeSagas
