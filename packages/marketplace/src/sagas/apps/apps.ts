import { clientFetchAppDetailSuccess } from '@/actions/apps'
import { integrationTypesReceiveData } from '@/actions/desktop-integration-types'
import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { logger } from '@reapit/utils'
import { fetchAppById, FetchAppByIdParams } from '@/services/apps'
import { fetchDesktopIntegrationTypesList } from '@/services/desktop-integration-types'
import { fetchApiKeyInstallationById } from '@/services/installations'

export const fetchClientAppDetailSaga = function*({ data }: Action<FetchAppByIdParams>) {
  try {
    const appDetailResponse = yield call(fetchAppById, { clientId: data.clientId, id: data.id })
    if (appDetailResponse?.isWebComponent && appDetailResponse?.installationId) {
      const apiKeyResponse = yield call(fetchApiKeyInstallationById, {
        installationId: appDetailResponse.installationId,
      })
      appDetailResponse.apiKey = apiKeyResponse?.apiKey || ''
    }

    const desktopIntegrationTypes = yield call(fetchDesktopIntegrationTypesList, {})
    yield put(integrationTypesReceiveData(desktopIntegrationTypes))
    yield put(clientFetchAppDetailSuccess(appDetailResponse))
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

export const clientAppDetailDataListen = function*() {
  yield takeLatest<Action<FetchAppByIdParams>>(ActionTypes.CLIENT_FETCH_APP_DETAIL, fetchClientAppDetailSaga)
}

const appDetailSagas = function*() {
  yield all([fork(clientAppDetailDataListen)])
}

export default appDetailSagas
