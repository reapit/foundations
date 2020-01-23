import {
  adminApprovalsLoading,
  adminApprovalsReceiveData,
  adminApprovalsRequestDataFailure
} from '../actions/admin-approvals'
import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { fetcher } from '@reapit/elements'
import { Action } from '@/types/core'

export const adminApprovalsDataFetch = function*({ data: page }) {
  yield put(adminApprovalsLoading(true))

  try {
    const response = yield call(fetcher, {
      url: `${URLS.approvals}?PageNumber=${page}&PageSize=${REVISIONS_PER_PAGE}`,
      api: process.env.MARKETPLACE_API_BASE_URL as string,
      method: 'GET',
      headers: MARKETPLACE_HEADERS
    })
    if (response) {
      yield put(adminApprovalsReceiveData({ data: response }))
    } else {
      yield put(adminApprovalsRequestDataFailure())
    }
  } catch (err) {
    console.error(err.message)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const adminApprovalsDataListen = function*() {
  yield takeLatest<Action<number>>(ActionTypes.ADMIN_APPROVALS_REQUEST_DATA, adminApprovalsDataFetch)
}

const adminApprovalsSagas = function*() {
  yield all([fork(adminApprovalsDataListen)])
}

export default adminApprovalsSagas
