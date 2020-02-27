import { appDeleteRequestSuccess, appDeleteRequestLoading, appDeleteRequestFailure } from '@/actions/app-delete'
import { put, call, takeLatest } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import api from './api'
import { adminAppsReceiveData } from '@/actions/admin-apps'
import { getParamsFromPath } from '@/utils/client-url-params'
import { logger } from 'logger'

export const appDeleteRequestSaga = function*({ data: appId }: Action<string>) {
  try {
    yield put(appDeleteRequestLoading())
    const response = yield call(api.deleteApp, { appId })
    if (response) {
      const params = getParamsFromPath(window.location.search)
      console.log('TCL: params', params)
      const adminAppsResponse = yield call(api.fetchAdminApps, { params })
      yield put(adminAppsReceiveData(adminAppsResponse))
    }
    yield put(appDeleteRequestSuccess())
  } catch (err) {
    logger(err)
    yield put(appDeleteRequestFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const appDeleteRequestListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.APP_DELETE_REQUEST, appDeleteRequestSaga)
}

export default appDeleteRequestListen
