import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { installationsListReducer, defaultState } from '../list'

describe('installationsListReducer', () => {
  it('should return default state if action not matched', () => {
    const newState = installationsListReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set state to test when FETCH_INSTALLATIONS_LIST action is called', () => {
    const newState = installationsListReducer(undefined, {
      type: ActionTypes.FETCH_INSTALLATIONS_LIST as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      isLoading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set state to test when FETCH_INSTALLATIONS_LIST_SUCCESS action is called', () => {
    const newState = installationsListReducer(undefined, {
      type: ActionTypes.FETCH_INSTALLATIONS_LIST_SUCCESS as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      isLoading: false,
      list: {},
    }
    expect(newState).toEqual(expected)
  })

  it('should set state to test when FETCH_INSTALLATIONS_LIST_FAILED action is called', () => {
    const newState = installationsListReducer(undefined, {
      type: ActionTypes.FETCH_INSTALLATIONS_LIST_FAILED as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      isLoading: false,
    }
    expect(newState).toEqual(expected)
  })
})
