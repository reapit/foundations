import { myAppsLoading, myAppsReceiveData, myAppsRequestDataFailure } from '../actions/my-apps'
import { put, fork, takeLatest, call, all, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { URLS, generateHeader } from '@/constants/api'
import { fetcher } from '@reapit/elements'
import { Action } from '@/types/core'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { selectClientId } from '@/selector/client'
import { logger } from 'logger'

export const myAppsDataFetch = function*({ data: page }) {
  yield put(myAppsLoading(true))

  try {
    const clientId = yield select(selectClientId)
    if (!clientId) {
      throw new Error('Client id does not exist in state')
    }

    const response = yield call(fetcher, {
      url: `${URLS.apps}?clientId=${clientId}&OnlyInstalled=true&PageNumber=${page}&PageSize=${APPS_PER_PAGE}`,
      method: 'GET',
      api: window.reapit.config.marketplaceApiUrl,
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    if (response) {
      yield put(myAppsReceiveData({ data: response }))
    } else {
      yield put(myAppsRequestDataFailure())
    }
  } catch (err) {
    logger(err)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const myAppsDataListen = function*() {
  yield takeLatest<Action<number>>(ActionTypes.MY_APPS_REQUEST_DATA, myAppsDataFetch)
}

const myAppsSagas = function*() {
  yield all([fork(myAppsDataListen)])
}

export default myAppsSagas
