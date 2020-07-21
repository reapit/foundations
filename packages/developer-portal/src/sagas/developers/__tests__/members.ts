import { put, call, takeLatest, all, fork } from 'redux-saga/effects'
import { errorThrownServer } from '@/actions/error'
import { Action } from '@/types/core'
import errorMessages from '@/constants/error-messages'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { organisationFetchMembers, organisationFetchMembersListen, organisationMembersListSagas } from '../members'
import { FetchOrganisationMembers, fetchOrganisationMembers } from '@/services/developers'
import { fetchOrganisationMembersSuccess, fetchOrganisationMembersFailed } from '@/actions/developers'
import ActionTypes from '@/constants/action-types'
import { PagedResultMemberModel_ } from '@reapit/foundations-ts-definitions'

describe('organisationMembersSagas', () => {
  describe('organisationFetchMembers', () => {
    const params: Action<FetchOrganisationMembers> = {
      data: { id: 'developerId' },
      type: 'ORGANISATION_FETCH_MEMBERS',
    }
    const gen = cloneableGenerator(organisationFetchMembers)(params)
    expect(gen.next().value).toEqual(call(fetchOrganisationMembers, { id: params.data.id }))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next({}).value).toEqual(put(fetchOrganisationMembersSuccess({} as PagedResultMemberModel_)))
      expect(clone.next().done).toBe(true)
    })

    test('api call error', () => {
      const clone = gen.clone()
      if (!clone.throw) throw new Error('Generator object cannot throw')
      expect(clone.throw('error').value).toEqual(put(fetchOrganisationMembersFailed()))
      expect(clone.next().value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
    })
  })
})

describe('organisationFetchMembersListen', () => {
  it('should trigger saga function when called', () => {
    const gen = organisationFetchMembersListen()
    expect(gen.next().value).toEqual(
      takeLatest<Action<FetchOrganisationMembers>>(ActionTypes.ORGANISATION_FETCH_MEMBERS, organisationFetchMembers),
    )

    expect(gen.next().done).toBe(true)
  })
})

describe('organisationMembersListSagas', () => {
  it('should listen saga', () => {
    const gen = organisationMembersListSagas()

    expect(gen.next().value).toEqual(all([fork(organisationFetchMembersListen)]))
    expect(gen.next().done).toBe(true)
  })
})
