import fetcher from '../utils/fetcher'
import { URLS } from '../constants/api'
import { itemLoading, itemReceiveData } from '../actions/item'
import { ItemItem } from '../reducers/item'
import { put, call, fork, takeEvery, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'

export const itemDataFetch = function*() {
  yield put(itemLoading(true))

  try {
    const redditData: ItemItem | undefined = yield call(fetcher, { url: URLS.node, method: 'GET' })

    yield put(itemReceiveData(redditData))
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

export const itemDataListen = function*() {
  yield takeEvery(ActionTypes.ITEM_REQUEST_DATA, itemDataFetch)
}

const itemSagas = function*() {
  yield all([fork(itemDataListen)])
}

export default itemSagas
