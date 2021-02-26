import { fetchAppDetailSuccess, fetchAppDetailFailed, AppDetailParams } from '@/actions/app-detail'
import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { extractNetworkErrString } from '@reapit/utils'
import { fetchAppById } from '@/services/apps'
import { fetchApiKeyInstallationById } from '@/services/installations'
import { notification } from '@reapit/elements'

export const appDetailDataFetch = function* ({ data }: Action<AppDetailParams>) {
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
    yield put(fetchAppDetailSuccess({ data: appDetailResponse }))
  } catch (err) {
    const networkErrorString = extractNetworkErrString(err)
    yield call(notification.error, {
      message: networkErrorString,
      placement: 'bottomRight',
    })
    yield put(fetchAppDetailFailed(networkErrorString))
  }
}

export const appDetailDataListen = function* () {
  yield takeLatest<Action<AppDetailParams>>(ActionTypes.FETCH_APP_DETAIL, appDetailDataFetch)
}

const appDetailSagas = function* () {
  yield all([fork(appDetailDataListen)])
}

export default appDetailSagas
