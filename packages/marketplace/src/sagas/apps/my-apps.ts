import { put, fork, takeLatest, call, all } from '@redux-saga/core/effects'
import { notification } from '@reapit/elements'
import { myAppsReceiveData, myAppsRequestDataFailure } from '@/actions/apps'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { selectDeveloperEditionId } from '@/selector/auth'
import { fetchAppsList } from '@/services/apps'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { selectClientId } from '@/selector/auth'
import { CLIENT_ID_NOT_FOUND_ERROR } from '@/constants/errors'

export const myAppsDataFetch = function*({ data: page }) {
  try {
    const connectSession = yield call(reapitConnectBrowserSession.connectSession)
    const clientId = yield call(selectClientId, connectSession)
    if (!clientId) {
      throw CLIENT_ID_NOT_FOUND_ERROR
    }
    const developerId = yield call(selectDeveloperEditionId, connectSession)
    const response = yield call(fetchAppsList, {
      clientId,
      developerId: developerId ? [developerId] : [],
      onlyInstalled: true,
      pageNumber: page,
      pageSize: APPS_PER_PAGE,
    })
    yield put(myAppsReceiveData(response))
  } catch (err) {
    yield put(myAppsRequestDataFailure(err.description))
    notification.error({
      message: err.description,
    })
  }
}

export const myAppsDataListen = function*() {
  yield takeLatest<Action<number>>(ActionTypes.MY_APPS_REQUEST_DATA, myAppsDataFetch)
}

export const myAppsSagas = function*() {
  yield all([fork(myAppsDataListen)])
}

export default myAppsSagas
