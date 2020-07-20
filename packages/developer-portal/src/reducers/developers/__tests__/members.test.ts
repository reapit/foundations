import { defaultState, membersReducer } from '../members'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'

describe('membersReducer', () => {
  it('should return default state if action not matched', () => {
    const newState = membersReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set state to test when INVITE_DEVELOPER_AS_ORG_MEMBER action is called with test', () => {
    const newState = membersReducer(undefined, {
      type: ActionTypes.INVITE_DEVELOPER_AS_ORG_MEMBER as ActionType,
      data: {
        callback: jest.fn(),
        id: 'string',
        email: 'string',
        name: 'string',
        jobTitle: 'string',
        sender: 'string',
        message: 'string',
      },
    })
    const expected = {
      ...defaultState,
      inviteMember: {
        loading: true,
        error: '',
      },
    }
    expect(newState).toEqual(expected)
  })

  it('should set state to test when INVITE_DEVELOPER_AS_ORG_MEMBER_FAILED action is called with test', () => {
    const newState = membersReducer(undefined, {
      type: ActionTypes.INVITE_DEVELOPER_AS_ORG_MEMBER_FAILED as ActionType,
      data: '123',
    })
    const expected = {
      ...defaultState,
      inviteMember: {
        loading: false,
        error: '123',
      },
    }
    expect(newState).toEqual(expected)
  })
})
