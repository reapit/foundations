import memberDetailsReducer, { defaultState } from '../member-details'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'

describe('developerDetailsReducer', () => {
  it('should return default state if action not matched', () => {
    const newState = memberDetailsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set state to test when FETCH_MEMBER_DETAILS action is called with test', () => {
    const newState = memberDetailsReducer(undefined, {
      type: ActionTypes.FETCH_MEMBER_DETAILS as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      loading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set state to test when FETCH_MEMBER_DETAILS_SUCCESS action is called with test', () => {
    const newState = memberDetailsReducer(undefined, {
      type: ActionTypes.FETCH_MEMBER_DETAILS_SUCCESS as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      loading: false,
      data: {},
    }
    expect(newState).toEqual(expected)
  })

  it('should set state to test when FETCH_MEMBER_DETAILS_FAILED action is called with test', () => {
    const newState = memberDetailsReducer(undefined, {
      type: ActionTypes.FETCH_MEMBER_DETAILS_FAILED as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      loading: false,
    }
    expect(newState).toEqual(expected)
  })
})
