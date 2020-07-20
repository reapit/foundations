import { all, call, fork, put, takeLatest } from 'redux-saga/effects'
import { inviteDeveloperAsOrgMemberApi, InviteDeveloperAsOrgMemberParams } from '@/services/developers'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { Action, ActionType } from '@/types/core'
import membersSagas, { inviteDeveloperAsOrgMemberSagas, inviteDeveloperAsOrgMemberSagasListen } from '../members'
import errorMessages from '@/constants/error-messages'
import { inviteDeveloperAsOrgMemberFailed } from '@/actions/developers'
import { errorThrownServer } from '@/actions/error'
import ActionTypes from '@/constants/action-types'

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
  describe('inviteDeveloperAsOrgMemberSagas', () => {
    const gen = cloneableGenerator(inviteDeveloperAsOrgMemberSagas)(params)
    expect(gen.next().value).toEqual(call(inviteDeveloperAsOrgMemberApi, { ...params.data }))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(true).done).toEqual(true)
    })

    test('api call fail', () => {
      const clone = gen.clone()
      if (clone.throw) {
        expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(
          put(inviteDeveloperAsOrgMemberFailed(errorMessages.DEFAULT_SERVER_ERROR)),
        )
        expect(clone.next().value).toEqual(
          put(
            errorThrownServer({
              type: 'SERVER',
              message: errorMessages.DEFAULT_SERVER_ERROR,
            }),
          ),
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

      expect(gen.next().value).toEqual(all([fork(inviteDeveloperAsOrgMemberSagasListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
