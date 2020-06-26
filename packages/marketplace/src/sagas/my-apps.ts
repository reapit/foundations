import { myAppsLoading, myAppsReceiveData, myAppsRequestDataFailure } from '../actions/my-apps'
import { put, fork, takeLatest, call, all, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { Action } from '@/types/core'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { selectClientId, selectDeveloperId } from '@/selector/client'
import { logger } from '@reapit/utils'
import { fetchAppsList } from '@/services/apps'

export const myAppsDataFetch = function*({ data: page }) {
  yield put(myAppsLoading(true))

  try {
    const clientId = yield select(selectClientId)
    if (!clientId) {
      return
    }
    const developerId = yield select(selectDeveloperId)
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
