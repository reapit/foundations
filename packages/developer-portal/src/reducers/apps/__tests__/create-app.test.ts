import createAppReducer, { defaultState } from '../create-app'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'

describe('createApp reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = createAppReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set isLoading to true when CREATE_APP', () => {
    const newState = createAppReducer(undefined, {
      type: ActionTypes.CREATE_APP as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      isLoading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set isLoading to false when CREATE_APP_SUCCESS', () => {
    const newState = createAppReducer(undefined, {
      type: ActionTypes.CREATE_APP_SUCCESS as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      isLoading: false,
    }
    expect(newState).toEqual(expected)
  })

  it('should set isLoading to false when CREATE_APP_FAILED', () => {
    const newState = createAppReducer(undefined, {
      type: ActionTypes.CREATE_APP_FAILED as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      isLoading: false,
    }
    expect(newState).toEqual(expected)
  })
})
