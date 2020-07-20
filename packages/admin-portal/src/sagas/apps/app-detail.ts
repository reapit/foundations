import {
  appDetailLoading,
  appDetailReceiveData,
  appDetailFailure,
  AppDetailParams,
  setAppDetailStale,
} from '@/actions/app-detail'
import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { logger } from '@reapit/utils'
import { fetchAppById } from '@/services/apps'
import { fetchApiKeyInstallationById } from '@/services/installations'

export const appDetailDataFetch = function*({ data }: Action<AppDetailParams>) {
  yield put(appDetailLoading(true))
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
      yield put(appDetailReceiveData({ data: appDetailResponse }))
      yield put(setAppDetailStale(false))
    } else {
      yield put(appDetailFailure())
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

export const appDetailDataListen = function*() {
  yield takeLatest<Action<AppDetailParams>>(ActionTypes.APP_DETAIL_REQUEST_DATA, appDetailDataFetch)
}

const appDetailSagas = function*() {
  yield all([fork(appDetailDataListen)])
}

export default appDetailSagas
