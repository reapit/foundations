import { all, fork, call, put, takeLatest } from 'redux-saga/effects'
import { Action } from '@/types/core'
import {
  fetchMemberDetails,
  acceptInviteMember,
  rejectInviteMember,
  FetchMemberDetailsParams,
  AcceptInviteMemberParams,
  RejectInviteMemberParams,
} from '@/services/developers'
import errorMessages from '@/constants/error-messages'
import ActionTypes from '@/constants/action-types'
import { fetchMemberDetailsSuccess, fetchMemberDetailsFailed, setInviteMemberStatus } from '@/actions/developers'
import { notification } from '@reapit/elements'

export const fetchMemberDetailsSaga = function*({ data }: Action<FetchMemberDetailsParams>) {
  try {
    const { developerId, memberId } = data
    if (!developerId || !memberId) throw new Error('Missing some data')
    const response = yield call(fetchMemberDetails, { developerId, memberId })
    yield put(fetchMemberDetailsSuccess(response))
  } catch (err) {
    yield put(fetchMemberDetailsFailed())
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const acceptInviteMemberSaga = function*({ data }: Action<AcceptInviteMemberParams>) {
  try {
    yield put(setInviteMemberStatus('ACCEPTING'))
    yield call(acceptInviteMember, data)
    yield put(setInviteMemberStatus('ACCEPTED'))
  } catch (err) {
    yield put(setInviteMemberStatus('ERROR'))
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const rejectInviteMemberSaga = function*({ data }: Action<RejectInviteMemberParams>) {
  try {
    yield put(setInviteMemberStatus('REJECTING'))
    yield call(rejectInviteMember, data)
    yield put(setInviteMemberStatus('REJECTED'))
  } catch (err) {
    yield put(setInviteMemberStatus('ERROR'))
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const fetchMemberDetailsListen = function*() {
  yield takeLatest<Action<FetchMemberDetailsParams>>(ActionTypes.FETCH_MEMBER_DETAILS, fetchMemberDetailsSaga)
}
export const acceptInviteMemberListen = function*() {
  yield takeLatest<Action<AcceptInviteMemberParams>>(ActionTypes.ACCEPT_INVITE_MEMBER, acceptInviteMemberSaga)
}
export const rejectInviteMemberListen = function*() {
  yield takeLatest<Action<RejectInviteMemberParams>>(ActionTypes.REJECT_INVITE_MEMBER, rejectInviteMemberSaga)
}

export const memberDetailsListSagas = function*() {
  yield all([fork(fetchMemberDetailsListen), fork(acceptInviteMemberListen), fork(rejectInviteMemberListen)])
}

export default memberDetailsListSagas
