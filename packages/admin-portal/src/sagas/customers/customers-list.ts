import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { fetchCustomersListFailed, fetchCustomersListSuccess, FetchCustomersListQueryParams } from '@/actions/customers'
import { fetchCustomersList as fetchCustomersListAPI } from '@/services/customers'

import { notification } from '@reapit/elements'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { CUSTOMERS_PER_PAGE } from '@/constants/paginator'
import { extractNetworkErrString } from '@reapit/utils'

export const DEFAULT_PAGE = 1
export const FETCH_LIST_ERROR_MESSAGE = 'Can not fetch customers list !'

export const fetchCustomersListHandler = function*({ data: { queryString } }) {
  try {
    const queryParams = new URLSearchParams(queryString)
    const pageNumber = parseInt(queryParams.get('page') as string)
    const page = pageNumber < 1 || isNaN(pageNumber) ? DEFAULT_PAGE : pageNumber
    const name = queryParams.getAll('name')
    const agencyCloudId = queryParams.getAll('agencyCloudId')

    const response = yield call(fetchCustomersListAPI, {
      pageSize: CUSTOMERS_PER_PAGE,
      pageNumber: page,
      name,
      agencyCloudId,
    })
    if (response) {
      yield put(fetchCustomersListSuccess(response))
      return
    }
    throw new Error(FETCH_LIST_ERROR_MESSAGE)
  } catch (err) {
    const networkErrorString = extractNetworkErrString(err)
    yield put(fetchCustomersListFailed(networkErrorString))
    yield call(notification.error, {
      message: networkErrorString,
      placement: 'bottomRight',
    })
  }
}

export const fetchCustomersListListen = function*() {
  yield takeLatest<Action<FetchCustomersListQueryParams>>(ActionTypes.FETCH_CUSTOMERS_LIST, fetchCustomersListHandler)
}

const customersListSagas = function*() {
  yield all([fork(fetchCustomersListListen)])
}

export default customersListSagas
