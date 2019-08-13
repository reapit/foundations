import fetcher from '../utils/fetcher'
import { URLS, MARKETPLACE_HEADERS, REAPIT_API_BASE_URL } from '../constants/api'
import { appDetailLoading, appDetailReceiveData, appDetailFailure } from '../actions/app-detail'
import { put, call, fork, takeLatest, all, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { Action } from '@/types/core'
import { selectClientId } from '@/selector/client'

export const appDetailDataFetch = function*({ data: id }) {
  yield put(appDetailLoading(true))
  try {
    const clientId = yield select(selectClientId)

    if (!clientId) {
      throw new Error('Client id does not exist in state')
    }
    const response = yield call(fetcher, {
      url: `${URLS.apps}/${id}?clientId=${clientId}`,
      api: REAPIT_API_BASE_URL,
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

export const appDetailDataListen = function*() {
  yield takeLatest<Action<String>>(ActionTypes.APP_DETAIL_REQUEST_DATA, appDetailDataFetch)
}

const appDetailSagas = function*() {
  yield all([fork(appDetailDataListen)])
}

export default appDetailSagas
