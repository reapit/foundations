import {
  fetchRevisionSuccess,
  fetchRevisionFailed,
  RevisionDetailRequestParams,
  RevisionApproveRequestParams,
  setRequestApproveRevisionFormState,
  RevisionDeclineRequestParams,
  setRequestDeclineRevisionFormState,
} from '@/actions/revision-detail'
import { put, call, fork, takeLatest, all, select } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { approvalsDataFetch } from '../approvals/approvals'
import { logger } from '@reapit/utils'
import { fetchAppRevisionsById, approveAppRevisionById, rejectAppRevisionById } from '@/services/apps'
import { fetchScopesList } from '@/services/scopes'
import { fetchDesktopIntegrationTypesList } from '@/services/desktop-integration-types'
import { selectApprovalListPageNumber } from '@/selector/approvals'

export const revisionDetailDataFetch = function*({
  data: { appId, appRevisionId },
}: Action<RevisionDetailRequestParams>) {
  try {
    const [response, scopes, desktopIntegrationTypes] = yield all([
      call(fetchAppRevisionsById, { id: appId, revisionId: appRevisionId }),
      call(fetchScopesList),
      call(fetchDesktopIntegrationTypesList, {}),
    ])

    if (response && scopes && desktopIntegrationTypes) {
      yield put(fetchRevisionSuccess({ data: response, scopes, desktopIntegrationTypes }))
    } else {
      yield put(fetchRevisionFailed())
    }
  } catch (err) {
    logger(err)
  }
}

export const revisionDetailDataListen = function*() {
  yield takeLatest<Action<RevisionDetailRequestParams>>(ActionTypes.FETCH_REVISION, revisionDetailDataFetch)
}
// TODO move to selector

export const requestApproveRevision = function*({ data: params }: Action<RevisionApproveRequestParams>) {
  const { pageNumber } = yield select(selectApprovalListPageNumber)
  yield put(setRequestApproveRevisionFormState('SUBMITTING'))
  const { appId, appRevisionId, ...body } = params
  try {
    const response = yield call(approveAppRevisionById, { id: appId, revisionId: appRevisionId, ...body })

    const status = response ? 'SUCCESS' : 'ERROR'
    if (status === 'SUCCESS') {
      yield call(approvalsDataFetch, { data: pageNumber })
    }
    yield put(setRequestApproveRevisionFormState(status))
  } catch (err) {
    logger(err)
    yield put(setRequestApproveRevisionFormState('ERROR'))
  }
}

export const requestApproveRevisionListen = function*() {
  yield takeLatest<Action<RevisionApproveRequestParams>>(ActionTypes.REQUEST_APPROVE_REVISION, requestApproveRevision)
}

export const requestDeclineRevision = function*({ data: params }: Action<RevisionDeclineRequestParams>) {
  const { pageNumber } = yield select(selectApprovalListPageNumber)
  yield put(setRequestDeclineRevisionFormState('SUBMITTING'))
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
    yield put(setRequestDeclineRevisionFormState(status))
  } catch (err) {
    logger(err)
    yield put(setRequestDeclineRevisionFormState('ERROR'))
  }
}

export const requestDeclineRevisionListen = function*() {
  yield takeLatest<Action<RevisionDeclineRequestParams>>(ActionTypes.REQUEST_DECLINE_REVISION, requestDeclineRevision)
}

const revisionDetailSagas = function*() {
  yield all([fork(revisionDetailDataListen), fork(requestApproveRevisionListen), fork(requestDeclineRevisionListen)])
}

export default revisionDetailSagas
