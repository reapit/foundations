import { clientLoading, clientReceiveData, clientRequestDataFailure, clientReceiveSearchApps } from '../actions/client'
import { categoriesReceiveData } from '@/actions/app-categories'
import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { fetcher } from '@reapit/elements'
import { Action } from '@/types/core'
import { REAPIT_API_BASE_URL } from '../constants/api'
import { selectClientId } from '@/selector/client'

export const clientDataFetch = function*({ data: page }) {
  yield put(clientLoading(true))

  try {
    const clientId = yield select(selectClientId)

    if (!clientId) {
      throw new Error('Client id does not exist in state')
    }
    const [apps, categories] = yield all([
      call(fetcher, {
        url: `${URLS.apps}?clientId=${clientId}&PageNumber=${page}&PageSize=${APPS_PER_PAGE}`,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: MARKETPLACE_HEADERS
      }),
      call(fetcher, {
        url: `${URLS.categories}`,
        method: 'GET',
        api: REAPIT_API_BASE_URL,
        headers: MARKETPLACE_HEADERS
      })
    ])

    if (apps && categories) {
      yield put(clientReceiveData({ data: apps }))
      yield put(categoriesReceiveData(categories))
    } else {
      yield put(clientRequestDataFailure())
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

export const clientSearchAppFetch = function*({ data: keyword }) {
  yield put(clientLoading(true))

  try {
    const clientId = yield select(selectClientId)

    if (!clientId) {
      throw new Error('Client id does not exist in state')
    }

    const response = yield call(fetcher, {
      url: `${URLS.apps}?clientId=${clientId}&PageNumber=1&PageSize=${APPS_PER_PAGE}&AppName=${keyword}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: MARKETPLACE_HEADERS
    })

    if (response) {
      yield put(clientLoading(false))
      yield put(clientReceiveSearchApps(response))
    } else {
      yield put(clientRequestDataFailure())
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

export const clientDataListen = function*() {
  yield takeLatest<Action<number>>(ActionTypes.CLIENT_REQUEST_DATA, clientDataFetch)
}

export const clientSearchAppListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.CLIENT_SEARCH_APPS, clientSearchAppFetch)
}

const clientSagas = function*() {
  yield all([fork(clientDataListen), fork(clientSearchAppListen)])
}

export default clientSagas
