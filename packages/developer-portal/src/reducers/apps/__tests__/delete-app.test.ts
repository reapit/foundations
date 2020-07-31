import deleteAppReducer, { defaultState } from '../delete-app'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'

describe('deleteApp reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = deleteAppReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set isLoading to true when DELETE_APP', () => {
    const newState = deleteAppReducer(undefined, {
      type: ActionTypes.DELETE_APP as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      isLoading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set isLoading to false when DELETE_APP_SUCCESS', () => {
    const newState = deleteAppReducer(undefined, {
      type: ActionTypes.DELETE_APP_SUCCESS as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      isLoading: false,
    }
    expect(newState).toEqual(expected)
  })

  it('should set isLoading to false when DELETE_APP_FAILED', () => {
    const newState = deleteAppReducer(undefined, {
      type: ActionTypes.DELETE_APP_FAILED as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      isLoading: false,
    }
    expect(newState).toEqual(expected)
  })
})
