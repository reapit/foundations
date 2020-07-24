import {
  installedAppsLoading,
  installedAppsReceiveData,
  installedAppsRequestDataFailure,
} from '../actions/installed-apps'
import { put, fork, takeLatest, call, all, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { Action } from '@/types/core'
import { INSTALLED_APPS_PERPAGE } from '@/constants/paginator'
import { selectDeveloperEditionId } from '@/selector/client'
import { logger } from '@reapit/utils'
import { fetchAppsList } from '@/services/apps'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { selectClientId } from '@/selector/auth'
import { CLIENT_ID_NOT_FOUND_ERROR } from '@/constants/errors'

// FIXME(selectClientId)
// fetch installed app
export const installedAppsDataFetch = function*({ data: page }) {
  yield put(installedAppsLoading(true))

  try {
    const connectSession = yield call(reapitConnectBrowserSession.connectSession)

    const clientId = yield call(selectClientId, connectSession)
    if (!clientId) {
      throw CLIENT_ID_NOT_FOUND_ERROR
    }
    // FIXME(selectDeveloperEditionId)
    // !? input dev id on API
    const developerId = yield select(selectDeveloperEditionId)
    const response = yield call(fetchAppsList, {
      clientId,
      developerId: developerId ? [developerId] : [],
      pageNumber: page,
      pageSize: INSTALLED_APPS_PERPAGE,
      onlyInstalled: true,
      isDirectApi: false,
    })
    if (response) {
      yield put(installedAppsReceiveData({ data: response }))
    } else {
      yield put(installedAppsRequestDataFailure())
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

export const installedAppsDataListen = function*() {
  yield takeLatest<Action<number>>(ActionTypes.INSTALLED_APPS_REQUEST_DATA, installedAppsDataFetch)
}

const installedAppsSagas = function*() {
  yield all([fork(installedAppsDataListen)])
}

export default installedAppsSagas
