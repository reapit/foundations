import { fetcher } from '@reapit/elements'
import { URLS, generateHeader } from '../constants/api'
import {
  revisionDetailLoading,
  revisionDetailReceiveData,
  revisionDetailFailure,
  RevisionDetailRequestParams,
  RevisionApproveRequestParams,
  approveRevisionSetFormState,
  RevisionDeclineRequestParams,
  declineRevisionSetFormState,
} from '../actions/revision-detail'
import { put, call, fork, takeLatest, all, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { Action, ReduxState } from '@/types/core'
import { adminApprovalsDataFetch } from './admin-approvals'
import { logger } from 'logger'

export const revisionDetailDataFetch = function*({
  data: { appId, appRevisionId },
}: Action<RevisionDetailRequestParams>) {
  yield put(revisionDetailLoading(true))
  try {
    const response = yield call(fetcher, {
      url: `${URLS.apps}/${appId}/revisions/${appRevisionId}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    const scopes = yield call(fetcher, {
      url: `${URLS.scopes}`,
      method: 'GET',
      api: window.reapit.config.marketplaceApiUrl,
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })

    if (response && scopes) {
      yield put(revisionDetailReceiveData({ data: response, scopes }))
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

export const getApprovalPageNumber = (state: ReduxState) => ({
  pageNumber: state?.adminApprovals?.adminApprovalsData?.data?.pageNumber || 1,
})

export const approveRevision = function*({ data: params }: Action<RevisionApproveRequestParams>) {
  const { pageNumber } = yield select(getApprovalPageNumber)
  yield put(approveRevisionSetFormState('SUBMITTING'))
  const { appId, appRevisionId, ...body } = params
  try {
    const response = yield call(fetcher, {
      url: `${URLS.apps}/${appId}/revisions/${appRevisionId}/approve`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'POST',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
      body,
    })

    const status = response ? 'SUCCESS' : 'ERROR'
    if (status === 'SUCCESS') {
      yield call(adminApprovalsDataFetch, { data: pageNumber })
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
  const { appId, appRevisionId, ...body } = params
  try {
    const response = yield call(fetcher, {
      url: `${URLS.apps}/${appId}/revisions/${appRevisionId}/reject`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'POST',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
      body,
    })

    const status = response ? 'SUCCESS' : 'ERROR'
    if (status === 'SUCCESS') {
      yield call(adminApprovalsDataFetch, { data: pageNumber })
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
