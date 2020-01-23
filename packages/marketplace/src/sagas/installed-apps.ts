import {
  installedAppsLoading,
  installedAppsReceiveData,
  installedAppsRequestDataFailure
} from '../actions/installed-apps'
import { put, fork, takeLatest, call, all, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { fetcher } from '@reapit/elements'
import { Action } from '@/types/core'
import { INSTALLED_APPS_PERPAGE } from '@/constants/paginator'
import { selectClientId } from '@/selector/client'

export const installedAppsDataFetch = function*({ data: page }) {
  yield put(installedAppsLoading(true))

  try {
    const clientId = yield select(selectClientId)
    if (!clientId) {
      throw new Error('Client id does not exist in state')
    }

    const response = yield call(fetchInstalledApps, { clientId, page })
    if (response) {
      yield put(installedAppsReceiveData({ data: response }))
    } else {
      yield put(installedAppsRequestDataFailure())
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

export const fetchInstalledApps = async ({ clientId, page }) => {
  return fetcher({
    url:
      `${URLS.apps}?clientId=${clientId}&OnlyInstalled=true&PageNumber=` +
      `${page}&PageSize=${INSTALLED_APPS_PERPAGE}&IsDirectApi=false`,
    method: 'GET',
    api: process.env.MARKETPLACE_API_BASE_URL as string,
    headers: MARKETPLACE_HEADERS
  })
}

export const installedAppsDataListen = function*() {
  yield takeLatest<Action<number>>(ActionTypes.INSTALLED_APPS_REQUEST_DATA, installedAppsDataFetch)
}

const installedAppsSagas = function*() {
  yield all([fork(installedAppsDataListen)])
}

export default installedAppsSagas
