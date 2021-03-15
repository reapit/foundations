import {
  fetchMemberDetailsSaga,
  acceptInviteMemberSaga,
  rejectInviteMemberSaga,
  fetchMemberDetailsListen,
  acceptInviteMemberListen,
  rejectInviteMemberListen,
  memberDetailsListSagas,
} from '../member-details'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import {
  FetchMemberDetailsParams,
  RejectInviteMemberParams,
  AcceptInviteMemberParams,
  fetchMemberDetails,
  acceptInviteMember,
  rejectInviteMember,
} from '@/services/developers'
import { Action } from '@/types/core'
import { call, put, takeLatest, fork, all } from 'redux-saga/effects'
import { fetchMemberDetailsSuccess, fetchMemberDetailsFailed, setInviteMemberStatus } from '@/actions/developers'
import { MemberModel } from '@reapit/foundations-ts-definitions'
import errorMessages from '@/constants/error-messages'
import ActionTypes from '@/constants/action-types'
import { notification } from '@reapit/elements'

describe('fetchMemberDetailsSaga', () => {
  const params: Action<FetchMemberDetailsParams> = {
    data: { developerId: 'developerId', memberId: 'memberId' },
    type: 'FETCH_MEMBER_DETAILS',
  }
  const gen = cloneableGenerator(fetchMemberDetailsSaga)(params)
  expect(gen.next().value).toEqual(call(fetchMemberDetails, params.data))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next({}).value).toEqual(put(fetchMemberDetailsSuccess({} as MemberModel)))
    expect(clone.next().done).toBe(true)
  })

  it('api call error', () => {
    const clone = gen.clone()
    if (!clone.throw) throw new Error('Generator object cannot throw')
    expect(clone.throw({ description: errorMessages.DEFAULT_SERVER_ERROR }).value).toEqual(
      put(fetchMemberDetailsFailed()),
    )
    expect(clone.next().value).toEqual(
      notification.error({
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  })
})

describe('acceptInviteMemberSaga', () => {
  const params: Action<AcceptInviteMemberParams> = {
    data: { developerId: 'developerId', memberId: 'memberId', name: 'name', jobTitle: 'CTO' },
    type: 'ACCEPT_INVITE_MEMBER',
  }
  const gen = cloneableGenerator(acceptInviteMemberSaga)(params)
  expect(gen.next().value).toEqual(put(setInviteMemberStatus('ACCEPTING')))
  expect(gen.next().value).toEqual(call(acceptInviteMember, params.data))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(setInviteMemberStatus('ACCEPTED')))
    expect(clone.next().done).toBe(true)
  })

  it('api call error', () => {
    const clone = gen.clone()
    if (!clone.throw) throw new Error('Generator object cannot throw')
    expect(clone.throw({ description: errorMessages.DEFAULT_SERVER_ERROR }).value).toEqual(
      put(setInviteMemberStatus('ERROR')),
    )
    expect(clone.next().value).toEqual(
      notification.error({
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  })
})

describe('rejectInviteMemberSaga', () => {
  const params: Action<RejectInviteMemberParams> = {
    data: { developerId: 'developerId', memberId: 'memberId' },
    type: 'REJECT_INVITE_MEMBER',
  }
  const gen = cloneableGenerator(rejectInviteMemberSaga)(params)

  expect(gen.next().value).toEqual(put(setInviteMemberStatus('REJECTING')))
  expect(gen.next().value).toEqual(call(rejectInviteMember, params.data))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(setInviteMemberStatus('REJECTED')))
    expect(clone.next().done).toBe(true)
  })

  it('api call error', () => {
    const clone = gen.clone()
    if (!clone.throw) throw new Error('Generator object cannot throw')
    expect(clone.throw({ description: errorMessages.DEFAULT_SERVER_ERROR }).value).toEqual(
      put(setInviteMemberStatus('ERROR')),
    )
    expect(clone.next().value).toEqual(
      notification.error({
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  })
})

describe('fetchMemberDetailsListen', () => {
  it('should trigger saga function when called', () => {
    const gen = fetchMemberDetailsListen()
    expect(gen.next().value).toEqual(
      takeLatest<Action<FetchMemberDetailsParams>>(ActionTypes.FETCH_MEMBER_DETAILS, fetchMemberDetailsSaga),
    )
    expect(gen.next().done).toBe(true)
  })
})

describe('acceptInviteMemberListen', () => {
  it('should trigger saga function when called', () => {
    const gen = acceptInviteMemberListen()
    expect(gen.next().value).toEqual(
      takeLatest<Action<AcceptInviteMemberParams>>(ActionTypes.ACCEPT_INVITE_MEMBER, acceptInviteMemberSaga),
    )
    expect(gen.next().done).toBe(true)
  })
})

describe('rejectInviteMemberListen', () => {
  it('should trigger saga function when called', () => {
    const gen = rejectInviteMemberListen()
    expect(gen.next().value).toEqual(
      takeLatest<Action<RejectInviteMemberParams>>(ActionTypes.REJECT_INVITE_MEMBER, rejectInviteMemberSaga),
    )
    expect(gen.next().done).toBe(true)
  })
})

describe('memberDetailsListSagas', () => {
  it('should listen', () => {
    const gen = memberDetailsListSagas()
    expect(gen.next().value).toEqual(
      all([fork(fetchMemberDetailsListen), fork(acceptInviteMemberListen), fork(rejectInviteMemberListen)]),
    )
    expect(gen.next().done).toBe(true)
  })
})
