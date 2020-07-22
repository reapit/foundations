import {
  revisionDetailLoading,
  revisionDetailReceiveData,
  revisionDetailFailure,
  RevisionDetailRequestParams,
  RevisionApproveRequestParams,
  approveRevisionSetFormState,
  RevisionDeclineRequestParams,
  declineRevisionSetFormState,
} from '@/actions/revision-detail'
import { put, call, fork, takeLatest, all, select } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { Action, ReduxState } from '@/types/core'
import { approvalsDataFetch } from '../approvals/approvals'
import { logger } from '@reapit/utils'
import { fetchAppRevisionsById, approveAppRevisionById, rejectAppRevisionById } from '@/services/apps'
import { fetchScopesList } from '@/services/scopes'
import { fetchDesktopIntegrationTypesList } from '@/services/desktop-integration-types'

export const revisionDetailDataFetch = function*({
  data: { appId, appRevisionId },
}: Action<RevisionDetailRequestParams>) {
  yield put(revisionDetailLoading(true))
  try {
    const [response, scopes, desktopIntegrationTypes] = yield all([
      call(fetchAppRevisionsById, { id: appId, revisionId: appRevisionId }),
      call(fetchScopesList),
      call(fetchDesktopIntegrationTypesList, {}),
    ])

    if (response && scopes && desktopIntegrationTypes) {
      yield put(revisionDetailReceiveData({ data: response, scopes, desktopIntegrationTypes }))
    } else {
      yield put(revisionDetailFailure())
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

export const revisionDetailDataListen = function*() {
  yield takeLatest<Action<RevisionDetailRequestParams>>(
    ActionTypes.REVISION_DETAIL_REQUEST_DATA,
    revisionDetailDataFetch,
  )
}
// TODO move to selector
export const getApprovalPageNumber = (state: ReduxState) => ({
  pageNumber: state?.approvals?.approvalsData?.data?.pageNumber || 1,
})

export const approveRevision = function*({ data: params }: Action<RevisionApproveRequestParams>) {
  const { pageNumber } = yield select(getApprovalPageNumber)
  yield put(approveRevisionSetFormState('SUBMITTING'))
  const { appId, appRevisionId, ...body } = params
  try {
    const response = yield call(approveAppRevisionById, { id: appId, revisionId: appRevisionId, ...body })

    const status = response ? 'SUCCESS' : 'ERROR'
    if (status === 'SUCCESS') {
      yield call(approvalsDataFetch, { data: pageNumber })
    }
    yield put(approveRevisionSetFormState(status))
  } catch (err) {
    logger(err)
    yield put(approveRevisionSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const approveRevisionListen = function*() {
  yield takeLatest<Action<RevisionApproveRequestParams>>(ActionTypes.REVISION_SUBMIT_APPROVE, approveRevision)
}

export const declineRevision = function*({ data: params }: Action<RevisionDeclineRequestParams>) {
  const { pageNumber } = yield select(getApprovalPageNumber)
  yield put(declineRevisionSetFormState('SUBMITTING'))
  const { appId, appRevisionId, callback, ...body } = params
  try {
    const response = yield call(rejectAppRevisionById, { id: appId, revisionId: appRevisionId, ...body })

    const status = response ? 'SUCCESS' : 'ERROR'
    if (status === 'SUCCESS') {
      yield call(approvalsDataFetch, { data: pageNumber })
      if (callback) {
        callback()
      }
    }
    yield put(declineRevisionSetFormState(status))
  } catch (err) {
    logger(err)
    yield put(declineRevisionSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const declineRevisionListen = function*() {
  yield takeLatest<Action<RevisionDeclineRequestParams>>(ActionTypes.REVISION_SUBMIT_DECLINE, declineRevision)
}

const revisionDetailSagas = function*() {
  yield all([fork(revisionDetailDataListen), fork(approveRevisionListen), fork(declineRevisionListen)])
}

export default revisionDetailSagas
