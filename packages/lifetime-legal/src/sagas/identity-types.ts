import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { errorThrownServer } from '../actions/error'
import { identityTypesReceiveData, identityTypesRequestFailure } from '../actions/identity-types'
import errorMessages from '../constants/error-messages'
import { fetchIdentityDocumentTypes } from './api'

export const identityTypesDataFetch = function*() {
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const response = yield call(fetchIdentityDocumentTypes, { headers })
    yield put(identityTypesReceiveData(response))
  } catch (err) {
    yield put(identityTypesRequestFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const identityTypesListen = function*() {
  yield takeLatest<Action<void>>(ActionTypes.IDENTITY_TYPES_REQUEST_DATA, identityTypesDataFetch)
}

export const identityTypesSagas = function*() {
  yield all([fork(identityTypesListen)])
}

export default identityTypesSagas
