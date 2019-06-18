import fetcher from '../utils/fetcher'
import { URLS } from '../constants/api'
import { itemLoading, itemReceiveData } from '../actions/item'
import { ItemItem } from '../reducers/item'
import { put, call, fork, takeEvery, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'

export const itemDataFetch = function*() {
  yield put(itemLoading(true))

  try {
    const redditData: ItemItem | undefined = yield call(fetcher, { url: URLS.node, method: 'GET' })

    yield put(itemReceiveData(redditData))
  } catch (err) {
    // TODO - should dispatch to error handler state
    console.error(err.message)
  }
}

export const itemDataListen = function*() {
  yield takeEvery(ActionTypes.ITEM_REQUEST_DATA, itemDataFetch)
}

const itemSagas = function*() {
  yield all([fork(itemDataListen)])
}

export default itemSagas
