import fetcher from '../utils/fetcher'
import { URLS } from '../constants/api'
import { homeLoading, homeReceiveData } from '../actions/home'
import { HomeItem } from '../reducers/home'
import { put, call, fork, takeEvery, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'

export const homeDataFetch = function*() {
  yield put(homeLoading(true))

  try {
    const redditData: HomeItem | undefined = yield call(fetcher, { url: URLS.react, method: 'GET' })

    yield put(homeReceiveData(redditData))
  } catch (err) {
    // TODO - should dispatch to error handler state
    console.error(err.message)
  }
}

export const homeDataListen = function*() {
  yield takeEvery(ActionTypes.HOME_REQUEST_DATA, homeDataFetch)
}

const homeSagas = function*() {
  yield all([fork(homeDataListen)])
}

export default homeSagas
