import { setAsAdminSaga, setAsAdminListen, setAsAdminSagas } from '../set-as-admin'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { updateOrganisationMemberById } from '@/services/developers'
import { Action } from '@/types/core'
import { call, put, takeLatest, fork, all } from 'redux-saga/effects'
import { setAsAdminSuccess, setAsAdminFailed, fetchOrganisationMembers, SetAsAdminParams } from '@/actions/developers'
import errorMessages from '@/constants/error-messages'
import ActionTypes from '@/constants/action-types'
import { notification } from '@reapit/elements'

describe('setAsAdminSaga', () => {
  const params: Action<SetAsAdminParams> = {
    data: {
      name: 'name',
      jobTitle: 'jobTitle',
      agreedTerms: 'agreedTerms',
      role: 'admin',
      id: 'id',
      memberId: 'memberId',
    },
    type: 'SET_AS_ADMIN',
  }
  const gen = cloneableGenerator(setAsAdminSaga)(params)
  expect(gen.next().value).toEqual(call(updateOrganisationMemberById, params.data))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next({}).value).toEqual(put(setAsAdminSuccess()))
    expect(clone.next({}).value).toEqual(put(fetchOrganisationMembers({ id: params.data.id })))
    expect(clone.next().done).toBe(true)
  })

  it('api call error', () => {
    const clone = gen.clone()
    if (!clone.throw) throw new Error('Generator object cannot throw')
    expect(clone.throw({ description: errorMessages.DEFAULT_SERVER_ERROR }).value).toEqual(put(setAsAdminFailed()))
    expect(clone.next().value).toEqual(
      notification.error({
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  })
})

describe('setAsAdminListen', () => {
  it('should trigger saga function when called', () => {
    const gen = setAsAdminListen()
    expect(gen.next().value).toEqual(takeLatest<Action<SetAsAdminParams>>(ActionTypes.SET_AS_ADMIN, setAsAdminSaga))
    expect(gen.next().done).toBe(true)
  })
})

describe('setAsAdminSagas', () => {
  it('should listen', () => {
    const gen = setAsAdminSagas()
    expect(gen.next().value).toEqual(all([fork(setAsAdminListen)]))
    expect(gen.next().done).toBe(true)
  })
})
