import { all, call, fork, put, takeLatest } from 'redux-saga/effects'
import {
  fetchOrganisationMembers,
  FetchOrganisationMembersParams,
  inviteDeveloperAsOrgMemberApi,
  InviteDeveloperAsOrgMemberParams,
} from '@/services/developers'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { Action, ActionType } from '@/types/core'
import membersSagas, {
  inviteDeveloperAsOrgMemberSagas,
  inviteDeveloperAsOrgMemberSagasListen,
  organisationFetchMembers,
  organisationFetchMembersListen,
} from '../members'
import errorMessages from '@/constants/error-messages'
import {
  fetchOrganisationMembersFailed,
  fetchOrganisationMembersSuccess,
  inviteDeveloperAsOrgMemberFailed,
  inviteDeveloperAsOrgMemberSuccess,
  fetchOrganisationMembers as fetchOrganisationMembersAction,
} from '@/actions/developers'
import ActionTypes from '@/constants/action-types'
import { PagedResultMemberModel_ } from '@reapit/foundations-ts-definitions'
import { getDeveloperId } from '@/utils/session'
import { notification } from '@reapit/elements'

const params: Action<InviteDeveloperAsOrgMemberParams & { callback: () => void }> = {
  data: {
    callback: jest.fn(),
    id: 'string',
    email: 'string',
    name: 'string',
    jobTitle: 'string',
    sender: 'string',
    message: 'string',
  },
  type: ActionTypes.INVITE_DEVELOPER_AS_ORG_MEMBER as ActionType,
}

describe('members', () => {
  describe('organisationFetchMembers', () => {
    const params: Action<FetchOrganisationMembersParams> = {
      data: { id: 'developerId' },
      type: 'ORGANISATION_FETCH_MEMBERS',
    }
    const gen = cloneableGenerator(organisationFetchMembers)(params)
    expect(gen.next().value).toEqual(call(fetchOrganisationMembers, { id: params.data.id }))

    it('api call success', () => {
      const clone = gen.clone()
      expect(clone.next({}).value).toEqual(put(fetchOrganisationMembersSuccess({} as PagedResultMemberModel_)))
      expect(clone.next().done).toBe(true)
    })

    it('api call error', () => {
      const clone = gen.clone()
      if (!clone.throw) throw new Error('Generator object cannot throw')
      expect(clone.throw({ description: errorMessages.DEFAULT_SERVER_ERROR }).value).toEqual(
        put(fetchOrganisationMembersFailed(errorMessages.DEFAULT_SERVER_ERROR)),
      )
      expect(clone.next().value).toEqual(
        notification.error({
          message: errorMessages.DEFAULT_SERVER_ERROR,
          placement: 'bottomRight',
        }),
      )
    })
  })

  describe('organisationFetchMembersListen', () => {
    it('should trigger saga function when called', () => {
      const gen = organisationFetchMembersListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<FetchOrganisationMembersParams>>(
          ActionTypes.ORGANISATION_FETCH_MEMBERS,
          organisationFetchMembers,
        ),
      )

      expect(gen.next().done).toBe(true)
    })
  })

  describe('inviteDeveloperAsOrgMemberSagas', () => {
    const gen = cloneableGenerator(inviteDeveloperAsOrgMemberSagas)(params)
    expect(gen.next().value).toEqual(call(inviteDeveloperAsOrgMemberApi, { ...params.data }))

    it('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(true).value).toEqual(put(inviteDeveloperAsOrgMemberSuccess()))
      expect(clone.next().value).toEqual(call(getDeveloperId))
      expect(clone.next('mockID').value).toEqual(put(fetchOrganisationMembersAction({ id: 'mockID' })))
      expect(clone.next().done).toEqual(true)
    })

    it('api call fail', () => {
      const clone = gen.clone()
      if (clone.throw) {
        expect(clone.throw({ description: errorMessages.DEFAULT_SERVER_ERROR }).value).toEqual(
          put(inviteDeveloperAsOrgMemberFailed()),
        )
        expect(clone.next().value).toEqual(
          notification.error({
            message: errorMessages.DEFAULT_SERVER_ERROR,
            placement: 'bottomRight',
          }),
        )
        expect(clone.next().done).toBe(true)
      }
    })
  })
  describe('inviteDeveloperAsOrgMemberSagasListen', () => {
    it('should trigger inviteDeveloper when called', () => {
      const gen = inviteDeveloperAsOrgMemberSagasListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<InviteDeveloperAsOrgMemberParams & { callback: () => void }>>(
          ActionTypes.INVITE_DEVELOPER_AS_ORG_MEMBER,
          inviteDeveloperAsOrgMemberSagas,
        ),
      )
      expect(gen.next().done).toBe(true)
    })
  })
  describe('membersSagas', () => {
    it('should listen', () => {
      const gen = membersSagas()

      expect(gen.next().value).toEqual(
        all([fork(inviteDeveloperAsOrgMemberSagasListen), fork(organisationFetchMembersListen)]),
      )
      expect(gen.next().done).toBe(true)
    })
  })
})
