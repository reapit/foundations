import { fetchAppDetailSuccess, fetchAppDetailFailed, AppDetailParams, setAppDetailStale } from '@/actions/app-detail'
import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { logger } from '@reapit/utils'
import { fetchAppById } from '@/services/apps'
import { fetchApiKeyInstallationById } from '@/services/installations'
/*
 * TODOME(appDetailDataFetch)
 *
 * - failure with correct error
 * - notificaion
 */

export const appDetailDataFetch = function*({ data }: Action<AppDetailParams>) {
  try {
    const { id, clientId } = data
    const appDetailResponse = yield call(fetchAppById, {
      clientId,
      id,
    })
    if (appDetailResponse?.isWebComponent && appDetailResponse?.installationId) {
      const apiKeyResponse = yield call(fetchApiKeyInstallationById, {
        installationId: appDetailResponse.installationId,
      })
      appDetailResponse.apiKey = apiKeyResponse?.apiKey || ''
    }
    if (appDetailResponse) {
      yield put(fetchAppDetailSuccess({ data: appDetailResponse }))
      yield put(setAppDetailStale(false))
    } else {
      yield put(fetchAppDetailFailed())
    }
  } catch (err) {
    logger(err)
  }
}

export const appDetailDataListen = function*() {
  yield takeLatest<Action<AppDetailParams>>(ActionTypes.FETCH_APP_DETAIL, appDetailDataFetch)
}

const appDetailSagas = function*() {
  yield all([fork(appDetailDataListen)])
}

export default appDetailSagas
