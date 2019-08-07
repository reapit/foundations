import { clientLoading, clientReceiveData, clientRequestDataFailure } from '../actions/client'
import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { APPS_PER_PAGE } from '@/constants/paginator'
import fetcher from '@/utils/fetcher'
import { Action, ReduxState } from '@/types/core'
import { REAPIT_API_BASE_URL } from '../constants/api'
import { oc } from 'ts-optchain'

export const selectClientId = (state: ReduxState) => {
  return oc<ReduxState>(state).auth.loginSession.loginIdentity.clientId(undefined)
}

export const clientDataFetch = function*({ data: page }) {
  yield put(clientLoading(true))

  try {
    const clientId = yield select(selectClientId)

    if (!clientId) {
      throw new Error('Client id does not exist in state')
    }

    const response = yield call(fetcher, {
      url: `${URLS.apps}?clientId=${clientId}&PageNumber=${page}&PageSize=${APPS_PER_PAGE}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: MARKETPLACE_HEADERS
    })
    if (response) {
      yield put(clientReceiveData({ data: response }))
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

const clientSagas = function*() {
  yield all([fork(clientDataListen)])
}

export default clientSagas
