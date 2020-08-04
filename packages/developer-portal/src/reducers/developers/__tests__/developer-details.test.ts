import developerDetailsReducer, { defaultState } from '../developer-details'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'

describe('developerDetailsReducer', () => {
  it('should return default state if action not matched', () => {
    const newState = developerDetailsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set state to test when FETCH_DEVELOPER_DETAILS action is called with test', () => {
    const newState = developerDetailsReducer(undefined, {
      type: ActionTypes.FETCH_DEVELOPER_DETAILS as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      isLoading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set state to test when FETCH_DEVELOPER_DETAILS_SUCCESS action is called with test', () => {
    const newState = developerDetailsReducer(undefined, {
      type: ActionTypes.FETCH_DEVELOPER_DETAILS_SUCCESS as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      isLoading: false,
      data: {},
    }
    expect(newState).toEqual(expected)
  })

  it('should set state to test when FETCH_DEVELOPER_DETAILS_FAILED action is called with test', () => {
    const newState = developerDetailsReducer(undefined, {
      type: ActionTypes.FETCH_DEVELOPER_DETAILS_FAILED as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      isLoading: false,
    }
    expect(newState).toEqual(expected)
  })
})
