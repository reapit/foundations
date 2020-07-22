import { all, fork, call, put, takeLatest } from 'redux-saga/effects'
import { Action } from '@/types/core'
import {
  fetchMemberDetails,
  FetchMemberDetails,
  AcceptInviteMember,
  acceptInviteMember,
  rejectInviteMember,
  RejectInviteMember,
} from '@/services/developers'
import { logger } from '@reapit/utils'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import ActionTypes from '@/constants/action-types'
import { fetchMemberDetailsSuccess, fetchMemberDetailsFailed, setInviteMemberStatus } from '@/actions/developers'

export const fetchMemberDetailsSaga = function*({ data }: Action<FetchMemberDetails>) {
  try {
    const { developerId, memberId } = data
    if (!developerId || !memberId) throw new Error('Missing some data')
    const response = yield call(fetchMemberDetails, { developerId, memberId })
    yield put(fetchMemberDetailsSuccess(response))
  } catch (err) {
    yield put(fetchMemberDetailsFailed())
    logger(err)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const acceptInviteMemberSaga = function*({ data }: Action<AcceptInviteMember>) {
  try {
    yield put(setInviteMemberStatus('ACCEPTING'))
    yield call(acceptInviteMember, data)
    yield put(setInviteMemberStatus('ACCEPTED'))
  } catch (err) {
    yield put(setInviteMemberStatus('ERROR'))
    logger(err)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const rejectInviteMemberSaga = function*({ data }: Action<RejectInviteMember>) {
  try {
    yield put(setInviteMemberStatus('REJECTING'))
    yield call(rejectInviteMember, data)
    yield put(setInviteMemberStatus('REJECTED'))
  } catch (err) {
    yield put(setInviteMemberStatus('ERROR'))
    logger(err)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const fetchMemberDetailsListen = function*() {
  yield takeLatest<Action<FetchMemberDetails>>(ActionTypes.FETCH_MEMBER_DETAILS, fetchMemberDetailsSaga)
}
export const acceptInviteMemberListen = function*() {
  yield takeLatest<Action<AcceptInviteMember>>(ActionTypes.ACCEPT_INVITE_MEMBER, acceptInviteMemberSaga)
}
export const rejectInviteMemberListen = function*() {
  yield takeLatest<Action<RejectInviteMember>>(ActionTypes.REJECT_INVITE_MEMBER, rejectInviteMemberSaga)
}

export const memberDetailsListSagas = function*() {
  yield all([fork(fetchMemberDetailsListen), fork(acceptInviteMemberListen), fork(rejectInviteMemberListen)])
}

export default memberDetailsListSagas
