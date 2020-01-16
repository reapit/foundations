import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { Action } from '@/types/core'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from '@/constants/api'
import { resultReceiveData, resultRequestDataFailure, ContactsParams } from '@/actions/results'
import { CONTACTS_PER_PAGE } from '@/constants/paginator'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { mapIdentitiesToContacts } from '@/utils/map-identities-to-contacts'

export const resultFetch = function*(params: Action<ContactsParams>) {
  try {
    const headers = yield call(initAuthorizedRequestHeaders)
    const responseContacts = yield call(fetcher, {
      url: `${URLS.contacts}/?${setQueryParams({ ...params.data, pageSize: CONTACTS_PER_PAGE })}`,
      api: process.env.PLATFORM_API_BASE_URL as string,
      method: 'GET',
      headers
    })

    const listContactId = responseContacts._embedded.map(({ id }) => id)
    /* fetch all identities which have contactId in listContactId */
    const responseIdentities = yield call(fetcher, {
      url: `${URLS.idChecks}/?${setQueryParams({ ContactId: [...listContactId] })}`,
      api: process.env.PLATFORM_API_BASE_URL as string,
      method: 'GET',
      headers
    })
    const responseContactsWithStatus = mapIdentitiesToContacts(responseContacts, responseIdentities)
    yield put(resultReceiveData(responseContactsWithStatus))
  } catch (err) {
    yield put(resultRequestDataFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
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
