import { myAppsLoading, myAppsReceiveData, myAppsRequestDataFailure } from '../actions/my-apps'
import { put, fork, takeLatest, call, all, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import fetcher from '@/utils/fetcher'
import { Action, ReduxState } from '@/types/core'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { REAPIT_API_BASE_URL } from '../constants/api'
import { oc } from 'ts-optchain'

export const selectClientId = (state: ReduxState) => {
  return oc<ReduxState>(state).auth.loginSession.loginIdentity.clientId(undefined)
}

export const myAppsDataFetch = function*({ data: page }) {
  yield put(myAppsLoading(true))

  try {
    const clientId = yield select(selectClientId)

    if (!clientId) {
      throw new Error('Client id does not exist in state')
    }

    const response = yield call(fetcher, {
      url: `${URLS.apps}?clientId=${clientId}&PageNumber=${page}&PageSize=${APPS_PER_PAGE}`,
      method: 'GET',
      api: REAPIT_API_BASE_URL,
      headers: MARKETPLACE_HEADERS
    })
    if (response) {
      yield put(myAppsReceiveData({ data: response }))
    } else {
      yield put(myAppsRequestDataFailure())
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

export const myAppsDataListen = function*() {
  yield takeLatest<Action<number>>(ActionTypes.MY_APPS_REQUEST_DATA, myAppsDataFetch)
}

const myAppsSagas = function*() {
  yield all([fork(myAppsDataListen)])
}

export default myAppsSagas
