import { myAppsLoading, myAppsReceiveData, myAppsRequestDataFailure } from '@/actions/apps'
import { put, fork, takeLatest, call, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { Action } from '@/types/core'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { selectDeveloperEditionId } from '@/selector/client'
import { logger } from '@reapit/utils'
import { fetchAppsList } from '@/services/apps'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { selectClientId } from '@/selector/auth'
import { CLIENT_ID_NOT_FOUND_ERROR } from '@/constants/errors'

export const myAppsDataFetch = function*({ data: page }) {
  yield put(myAppsLoading(true))

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
