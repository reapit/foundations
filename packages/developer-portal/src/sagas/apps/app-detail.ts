// import { clientFetchAppDetailSuccess } from '@/actions/client'
import { integrationTypesReceiveData } from '@/actions/app-integration-types'
import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { logger } from '@reapit/utils'
import { fetchAppById, fetchDesktopIntegrationTypes, FetchAppByIdParams } from '@/services/apps'
import { fetchAppDetailSuccess } from '@/actions/app-detail'
import { fetchApiKeyInstallationById } from '@/services/installations'

export const fetchAppDetailSaga = function*({ data }: Action<FetchAppByIdParams>) {
  try {
    const appDetailResponse = yield call(fetchAppById, { clientId: data.clientId, id: data.id })
    if (appDetailResponse?.isWebComponent && appDetailResponse?.installationId) {
      const apiKeyResponse = yield call(fetchApiKeyInstallationById, {
        installationId: appDetailResponse.installationId,
      })
      appDetailResponse.apiKey = apiKeyResponse?.apiKey || ''
    }
    const desktopIntegrationTypes = yield call(fetchDesktopIntegrationTypes)
    yield put(integrationTypesReceiveData(desktopIntegrationTypes))
    yield put(fetchAppDetailSuccess(appDetailResponse))
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
  yield takeLatest<Action<FetchAppByIdParams>>(ActionTypes.FETCH_APP_DETAIL, fetchAppDetailSaga)
}

const appDetailSagas = function*() {
  yield all([fork(appDetailDataListen)])
}

export default appDetailSagas
