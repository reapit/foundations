import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import {
  adminDevManagementLoading,
  adminDevManagementReceiveData,
  adminDevManagementRequestDataFailure,
  AdminDevManagementRequestDataValues,
} from '@/actions/admin-dev-management'
import { errorThrownServer } from '@/actions/error'
import { fetcher } from '@reapit/elements'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import errorMessages from '@/constants/error-messages'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { logger } from 'logger'

export const adminDevManagementRequestDataHandler = function*({ data: { page, queryString } }) {
  yield put(adminDevManagementLoading(true))

  try {
    const queryParams = new URLSearchParams(queryString)
    const name = queryParams.get('name') || ''
    const company = queryParams.get('company') || ''

    const response = yield call(fetcher, {
      url: `${URLS.developers}?PageNumber=${page}&PageSize=${REVISIONS_PER_PAGE}&Name=${name}&Company=${company}`,
      api: process.env.MARKETPLACE_API_BASE_URL as string,
      method: 'GET',
      headers: MARKETPLACE_HEADERS,
    })

    if (response) {
      yield put(adminDevManagementReceiveData(response))
    } else {
      yield put(adminDevManagementRequestDataFailure())
    }
  } catch (err) {
    logger(err)
    yield put(adminDevManagementRequestDataFailure(err.message))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const adminDevManagementRequestDataListen = function*() {
  yield takeLatest<Action<AdminDevManagementRequestDataValues>>(
    ActionTypes.ADMIN_DEV_MANAGEMENT_REQUEST_DATA,
    adminDevManagementRequestDataHandler,
  )
}

const adminDevManagementSagas = function*() {
  yield all([fork(adminDevManagementRequestDataListen)])
}

export default adminDevManagementSagas
