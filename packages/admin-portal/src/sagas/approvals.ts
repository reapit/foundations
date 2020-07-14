import { approvalsLoading, approvalsReceiveData, approvalsRequestDataFailure } from '../actions/approvals'
import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { Action } from '@/types/core'
import { logger } from '@reapit/utils'
import { fetchApprovalsList } from '@/services/approvals'

export const approvalsDataFetch = function*({ data: page }) {
  yield put(approvalsLoading(true))

  try {
    const response = yield call(fetchApprovalsList, { pageNumber: page })
    if (response) {
      yield put(approvalsReceiveData({ data: response }))
    } else {
      yield put(approvalsRequestDataFailure())
    }
  } catch (err) {
    logger(err)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const approvalsDataListen = function*() {
  yield takeLatest<Action<number>>(ActionTypes.APPROVALS_REQUEST_DATA, approvalsDataFetch)
}

const approvalsSagas = function*() {
  yield all([fork(approvalsDataListen)])
}

export default approvalsSagas
