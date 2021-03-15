import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import { notification } from '@reapit/elements'
import ActionTypes from '../constants/action-types'
import { Action } from '@/types/core'
import { resultReceiveData, resultRequestDataFailure, ContactsParams } from '@/actions/result'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { fetchContact } from './api'
import { extractNetworkErrString } from '@reapit/utils'

export const resultFetch = function* (params: Action<ContactsParams>) {
  try {
    const headers = yield call(initAuthorizedRequestHeaders)
    const responseContacts = yield call(fetchContact, {
      params,
      headers,
    })
    yield put(resultReceiveData(responseContacts))
  } catch (err) {
    yield put(resultRequestDataFailure())
    yield call(notification.error, {
      message: extractNetworkErrString(err),
    })
  }
}

export const resultListen = function* () {
  yield takeLatest<Action<ContactsParams>>(ActionTypes.RESULT_REQUEST_DATA, resultFetch)
}

const resultSagas = function* () {
  yield all([fork(resultListen)])
}

export default resultSagas
