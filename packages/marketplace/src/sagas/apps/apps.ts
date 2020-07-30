import { put, fork, takeLatest, call, all } from '@redux-saga/core/effects'
import { notification } from '@reapit/elements'
import {
  fetchAppsSuccess,
  fetchAppsFailed,
  fetchFeatureAppsSuccess,
  fetchFeatureAppsFailed,
  fetchAppDetailSuccess,
  fetchAppDetailFailure,
} from '@/actions/apps'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { selectDeveloperEditionId } from '@/selector/auth'
import { fetchAppByIdApi, FetchAppByIdParams, fetchAppsApi, FetchAppsParams } from '@/services/apps'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { selectClientId } from '@/selector/auth'
import { CLIENT_ID_NOT_FOUND_ERROR } from '@/constants/errors'
import { fetchApiKeyInstallationById } from '@/services/installations'

export const fetchApps = function*({ data }) {
  try {
    const connectSession = yield call(reapitConnectBrowserSession.connectSession)
    const developerId = yield call(selectDeveloperEditionId, connectSession)
    const clientId = yield call(selectClientId, connectSession)
    if (!clientId) {
      notification.error({
        message: CLIENT_ID_NOT_FOUND_ERROR,
        placement: 'bottomRight',
      })
      return
    }
    const response = yield call(fetchAppsApi, {
      clientId,
      developerId: developerId ? [developerId] : [],
      ...data,
    })
    yield put(fetchAppsSuccess(response))
  } catch (err) {
    yield put(fetchAppsFailed(err.description))
    notification.error({
      message: err.description,
      placement: 'bottomRight',
    })
  }
}

export const fetchAppsListen = function*() {
  yield takeLatest<Action<FetchAppsParams>>(ActionTypes.FETCH_APPS, fetchApps)
}

export const fetchFeatureApps = function*({ data }) {
  try {
    const connectSession = yield call(reapitConnectBrowserSession.connectSession)
    const developerId = yield call(selectDeveloperEditionId, connectSession)
    const clientId = yield call(selectClientId, connectSession)
    if (!clientId) {
      notification.error({
        message: CLIENT_ID_NOT_FOUND_ERROR,
        placement: 'bottomRight',
      })
      return
    }
    const response = yield call(fetchAppsApi, {
      clientId,
      developerId: developerId ? [developerId] : [],
      isFeatured: true,
      ...data,
    })
    yield put(fetchFeatureAppsSuccess(response))
  } catch (err) {
    yield put(fetchFeatureAppsFailed(err.description))
    notification.error({
      message: err.description,
      placement: 'bottomRight',
    })
  }
}

export const fetchFeatureAppsListen = function*() {
  yield takeLatest<Action<FetchAppsParams>>(ActionTypes.FETCH_FEATURE_APPS, fetchFeatureApps)
}

export const fetchAppDetailSagas = function*({ data }: Action<FetchAppByIdParams>) {
  try {
    const appDetailResponse = yield call(fetchAppByIdApi, { ...data })
    if (appDetailResponse?.isWebComponent && appDetailResponse?.installationId) {
      const apiKeyResponse = yield call(fetchApiKeyInstallationById, {
        installationId: appDetailResponse.installationId,
      })
      appDetailResponse.apiKey = apiKeyResponse?.apiKey || ''
    }
    yield put(fetchAppDetailSuccess(appDetailResponse))
  } catch (err) {
    yield put(fetchAppDetailFailure(err.description))
    notification.error({
      message: err.description,
      placement: 'bottomRight',
    })
  }
}

export const fetchAppDetailSagasListen = function*() {
  yield takeLatest<Action<FetchAppByIdParams>>(ActionTypes.FETCH_APP_DETAIL, fetchAppDetailSagas)
}

export const appsSagas = function*() {
  yield all([fork(fetchAppsListen), fork(fetchFeatureAppsListen), fork(fetchAppDetailSagasListen)])
}
