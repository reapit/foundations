import fetcher from '../utils/fetcher'
import { URLS, MARKETPLACE_HEADERS, REAPIT_API_BASE_URL } from '../constants/api'
import {
  appPermissionLoading,
  appPermissionReceiveData,
  appPermissionRequestDataFailure
} from '../actions/app-permission'
import { put, call, fork, takeLatest, all, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { Action } from '@/types/core'
import { selectClientId } from '@/selector/client'

export const appPermissionDataFetch = function*({ data: id }) {
  try {
    yield put(appPermissionLoading(true))
    const clientId = yield select(selectClientId)
    if (!clientId) {
      throw new Error('Client id is not exists')
    }
    const response = yield call(fetcher, {
      url: `${URLS.apps}/${id}/scopes?clientId=${clientId}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: MARKETPLACE_HEADERS
    })

    if (response) {
      yield put(appPermissionReceiveData(response))
    } else {
      yield put(appPermissionRequestDataFailure())
    }
  } catch (err) {
    console.error(err.message)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
    yield put(appPermissionRequestDataFailure())
  }
}

export const appPermissionDataListen = function*() {
  yield takeLatest<Action<String>>(ActionTypes.APP_PERMISION_REQUEST_DATA, appPermissionDataFetch)
}

const appPermissionSagas = function*() {
  yield all([fork(appPermissionDataListen)])
}

export default appPermissionSagas
