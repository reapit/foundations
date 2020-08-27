import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { Action } from '@/types/core'
import { fetcher } from '@reapit/elements'
import { URLS } from '@/constants/api'
import { resultReceiveData, resultRequestDataFailure, ContactsParams } from '@/actions/result'
import qs from 'query-string'
import { CONTACTS_PER_PAGE } from '@/constants/paginator'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { logger, cleanObject } from '@reapit/utils'

export const resultFetch = function*(params: Action<ContactsParams>) {
  try {
    const cleanedParamsObject = cleanObject(params.data)
    const headers = yield call(initAuthorizedRequestHeaders)
    const responseContacts = yield call(fetcher, {
      url: `${URLS.contacts}/?${qs.stringify({ ...cleanedParamsObject, pageSize: CONTACTS_PER_PAGE })}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers,
    })
    yield put(resultReceiveData(responseContacts))
  } catch (err) {
    logger(err)
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
