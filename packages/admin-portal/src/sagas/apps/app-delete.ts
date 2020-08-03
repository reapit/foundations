import { requestDeleteAppSuccess, requestDeleteAppFailed } from '@/actions/app-delete'
import { put, call, takeLatest } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { fetchAppListSuccess } from '@/actions/apps-management'
import { getParamsFromPath } from '@/utils/client-url-params'
import { logger } from '@reapit/utils'
import { deleteAppById, fetchAppsList } from '@/services/apps'
/*
 * TODOME(requestDeleteAppSaga)
 * send notification contain correct error string
 * throw error
 *
 */

export const requestDeleteAppSaga = function*({ data: appId }: Action<string>) {
  try {
    const response = yield call(deleteAppById, { id: appId })
    if (response) {
      const params = getParamsFromPath(window.location.search)
      const adminAppsResponse = yield call(fetchAppsList, { ...params })
      yield put(fetchAppListSuccess(adminAppsResponse))
    }
    yield put(requestDeleteAppSuccess())
  } catch (err) {
    logger(err)
    yield put(requestDeleteAppFailed())
  }
}

export const requestDeleteAppListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.DELETE_REQUEST_APP, requestDeleteAppSaga)
}

export default requestDeleteAppListen
