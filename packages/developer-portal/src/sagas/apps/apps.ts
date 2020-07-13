// import { clientFetchAppDetailSuccess } from '@/actions/client'
import { integrationTypesReceiveData } from '@/actions/app-integration-types'
import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { logger } from '@reapit/utils'
import { fetchAppById, fetchDesktopIntegrationTypes, FetchAppByIdParams } from '@/services/apps'
import { developerFetchAppDetailSuccess } from '@/actions/developer'
import { fetchApiKeyInstallationById } from '@/services/installations'
// import { AppDetailData } from '@/reducers/client/app-detail'

// export const fetchClientAppDetailSaga = function*({ data }: Action<FetchAppByIdParams>) {
//   try {
//     const appDetailResponse = yield call(fetchAppById, { clientId: data.clientId, id: data.id })
//     if (appDetailResponse?.isWebComponent && appDetailResponse?.installationId) {
//       const apiKeyResponse = yield call(fetchApiKeyInstallationById, {
//         installationId: appDetailResponse.installationId,
//       })
//       appDetailResponse.apiKey = apiKeyResponse?.apiKey || ''
//     }

//     const desktopIntegrationTypes = yield call(fetchDesktopIntegrationTypes)
//     yield put(integrationTypesReceiveData(desktopIntegrationTypes))
//     yield put(clientFetchAppDetailSuccess(appDetailResponse))
//   } catch (err) {
//     logger(err)
//     yield put(
//       errorThrownServer({
//         type: 'SERVER',
//         message: errorMessages.DEFAULT_SERVER_ERROR,
//       }),
//     )
//   }
// }

// export const developerApplyAppDetailsSaga = function*({ data }: Action<AppDetailData>) {
//   try {
//     const desktopIntegrationTypes = yield call(fetchDesktopIntegrationTypes)
//     yield put(integrationTypesReceiveData(desktopIntegrationTypes))
//     yield put(clientFetchAppDetailSuccess(data))
//   } catch (err) {
//     logger(err)
//     yield put(
//       errorThrownServer({
//         type: 'SERVER',
//         message: errorMessages.DEFAULT_SERVER_ERROR,
//       }),
//     )
//   }
// }

export const fetchDeveloperAppDetailSaga = function*({ data }: Action<FetchAppByIdParams>) {
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
    yield put(developerFetchAppDetailSuccess(appDetailResponse))
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

// export const clientAppDetailDataListen = function*() {
//   yield takeLatest<Action<FetchAppByIdParams>>(ActionTypes.CLIENT_FETCH_APP_DETAIL, fetchClientAppDetailSaga)
// }

export const developerAppDetailDataListen = function*() {
  yield takeLatest<Action<FetchAppByIdParams>>(ActionTypes.DEVELOPER_FETCH_APP_DETAIL, fetchDeveloperAppDetailSaga)
}

// export const developerApplyAppDetailsListen = function*() {
//   yield takeLatest<Action<AppDetailData>>(ActionTypes.DEVELOPER_APPLY_APP_DETAIL, developerApplyAppDetailsSaga)
// }

const appDetailSagas = function*() {
  yield all([fork(developerAppDetailDataListen)])
}

export default appDetailSagas
