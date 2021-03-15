import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { identityTypesReceiveData, identityTypesRequestFailure } from '../actions/identity-types'
import { extractNetworkErrString, logger } from '@reapit/utils'
import { fetchIdentityDocumentTypes } from './api'
import { notification } from '@reapit/elements'

export const identityTypesDataFetch = function* () {
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const response = yield call(fetchIdentityDocumentTypes, { headers })
    yield put(identityTypesReceiveData(response))
  } catch (err) {
    logger(err)
    yield put(identityTypesRequestFailure())
    yield call(notification.error, {
      message: extractNetworkErrString(err),
    })
  }
}

export const identityTypesListen = function* () {
  yield takeLatest<Action<void>>(ActionTypes.IDENTITY_TYPES_REQUEST_DATA, identityTypesDataFetch)
}

export const identityTypesSagas = function* () {
  yield all([fork(identityTypesListen)])
}

export default identityTypesSagas
