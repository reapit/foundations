import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import {
  fetchDeveloperListSuccess,
  fetchDeveloperListFailed,
  fetchDeveloperListValues,
} from '@/actions/devs-management'

import { DATE_TIME_FORMAT, notification } from '@reapit/elements'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { logger, extractNetworkErrString } from '@reapit/utils'
import dayjs from 'dayjs'
import { fetchDevelopersList } from '@/services/developers'

export const fetchDeveloperListHandler = function*({ data: { page, queryString } }) {
  try {
    const queryParams = new URLSearchParams(queryString)
    const name = queryParams.get('name') || ''
    const company = queryParams.get('company') || ''
    const registeredFrom = queryParams.get('registeredFrom')
    const registeredTo = queryParams.get('registeredTo')
    const formattedRegisteredFrom = registeredFrom ? dayjs(registeredFrom).format(DATE_TIME_FORMAT.YYYY_MM_DD) : ''
    const formattedRegisteredTo = registeredTo ? dayjs(registeredTo).format(DATE_TIME_FORMAT.YYYY_MM_DD) : ''

    const response = yield call(fetchDevelopersList, {
      pageSize: REVISIONS_PER_PAGE,
      pageNumber: page,
      name,
      company,
      registeredFrom: formattedRegisteredFrom,
      registeredTo: formattedRegisteredTo,
    })

    yield put(fetchDeveloperListSuccess(response))
  } catch (err) {
    logger(err)
    const networkErrorString = extractNetworkErrString(err)
    yield call(notification.error, {
      message: networkErrorString,
      placement: 'bottomRight',
    })
    yield put(fetchDeveloperListFailed(networkErrorString))
  }
}

export const fetchDeveloperListListen = function*() {
  yield takeLatest<Action<fetchDeveloperListValues>>(ActionTypes.FETCH_DEVELOPER_LIST, fetchDeveloperListHandler)
}

const devsManagementSagas = function*() {
  yield all([fork(fetchDeveloperListListen)])
}

export default devsManagementSagas
