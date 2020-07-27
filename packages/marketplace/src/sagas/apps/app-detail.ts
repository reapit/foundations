import {
  appDetailLoading,
  appDetailReceiveData,
  appDetailFailure,
  AppDetailParams,
  requestAuthenticationSuccess,
  requestAuthenticationFailure,
  setAppDetailStale,
} from '@/actions/apps'
import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { logger } from '@reapit/utils'
import { fetchAppById, fetchAppSecretById } from '@/services/apps'
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

export const requestAuthCode = function*({ data: id }: Action<string>) {
  try {
    const response = yield call(fetchAppSecretById, { id })
    if (response && response.clientSecret) {
      yield put(requestAuthenticationSuccess(response))
    } else {
      yield put(requestAuthenticationFailure())
      yield put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      )
    }
  } catch (err) {
    logger(err)
    yield put(requestAuthenticationFailure())
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

export const requestAuthenticationCodeListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.REQUEST_AUTHENTICATION_CODE, requestAuthCode)
}

export const appDetailSagas = function*() {
  yield all([fork(appDetailDataListen), fork(requestAuthenticationCodeListen)])
}

export default appDetailSagas
