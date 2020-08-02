import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import {
  devsManagementLoading,
  devsManagementReceiveData,
  devsManagementRequestDataFailure,
  DevsManagementRequestDataValues,
} from '@/actions/devs-management'

import { DATE_TIME_FORMAT } from '@reapit/elements'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { logger } from '@reapit/utils'
import dayjs from 'dayjs'
import { fetchDevelopersList } from '@/services/developers'

export const devsManagementRequestDataHandler = function*({ data: { page, queryString } }) {
  yield put(devsManagementLoading(true))

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

    if (response) {
      yield put(devsManagementReceiveData(response))
    } else {
      yield put(devsManagementRequestDataFailure())
    }
  } catch (err) {
    logger(err)
    yield put(devsManagementRequestDataFailure(err.message))
  }
}

export const devsManagementRequestDataListen = function*() {
  yield takeLatest<Action<DevsManagementRequestDataValues>>(
    ActionTypes.DEVS_MANAGEMENT_REQUEST_DATA,
    devsManagementRequestDataHandler,
  )
}

const devsManagementSagas = function*() {
  yield all([fork(devsManagementRequestDataListen)])
}

export default devsManagementSagas
