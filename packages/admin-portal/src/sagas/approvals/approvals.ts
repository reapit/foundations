import { fetchApprovalListSuccess, fetchApprovalListFailed } from '@/actions/approvals'
import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { extractNetworkErrString } from '@reapit/utils'
import { fetchApprovalsList } from '@/services/approvals'
import { notification } from '@reapit/elements'

export const approvalsDataFetch = function*({ data: page }) {
  try {
    const response = yield call(fetchApprovalsList, { pageNumber: page })
    if (response) {
      yield put(fetchApprovalListSuccess(response))
    } else {
      yield put(fetchApprovalListFailed())
    }
  } catch (err) {
    const networkErrorString = extractNetworkErrString(err)
    yield call(notification.error, {
      message: networkErrorString,
      placement: 'bottomRight',
    })
    yield put(fetchApprovalListFailed)
  }
}

export const approvalsDataListen = function*() {
  yield takeLatest<Action<number>>(ActionTypes.FETCH_APPROVAL_LIST, approvalsDataFetch)
}

const approvalsSagas = function*() {
  yield all([fork(approvalsDataListen)])
}

export default approvalsSagas
