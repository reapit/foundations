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
import { selectClientId, selectDeveloperEditionId } from '@/selector/client'
import { logger } from '@reapit/utils'
import { fetchAppsList } from '@/services/apps'

// FIXME(selectClientId)
// fetch installed app
export const installedAppsDataFetch = function*({ data: page }) {
  yield put(installedAppsLoading(true))

  try {
    const clientId = yield select(selectClientId)
    if (!clientId) {
      return
    }
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
