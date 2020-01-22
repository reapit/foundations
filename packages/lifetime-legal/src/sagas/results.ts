import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { Action } from '@/types/core'
import { resultReceiveData, resultRequestDataFailure, ContactsParams } from '@/actions/results'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { mapIdentitiesToContacts } from '@/utils/map-identities-to-contacts'
import { fetchContacts, fetchIdentitiesCheck } from './api'

export const resultFetch = function*(params: Action<ContactsParams>) {
  try {
    const headers = yield call(initAuthorizedRequestHeaders)
    const responseContacts = yield call(fetchContacts, { headers, params })
    const listContactId = responseContacts._embedded.map(({ id }) => id)
    const responseIdentities = yield call(fetchIdentitiesCheck, { headers, listContactId })
    const responseContactsWithStatus = mapIdentitiesToContacts(responseContacts, responseIdentities)
    yield put(resultReceiveData(responseContactsWithStatus))
  } catch (err) {
    yield put(resultRequestDataFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const resultListen = function*() {
  yield takeLatest<Action<ContactsParams>>(ActionTypes.RESULT_REQUEST_DATA, resultFetch)
}

const resultSagas = function*() {
  yield all([fork(resultListen)])
}

export default resultSagas
