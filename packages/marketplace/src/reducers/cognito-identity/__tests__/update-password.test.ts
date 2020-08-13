import { updatePasswordReducer, defaultState } from '../update-password'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'

describe('updatePasswordReducer reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = updatePasswordReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set formState to test when CHANGE_PASSWORD_SUCCESS action is called with test', () => {
    const newState = updatePasswordReducer(undefined, {
      type: ActionTypes.CHANGE_PASSWORD_SUCCESS as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      loading: false,
    }
    expect(newState).toEqual(expected)
  })

  it('should set formState to test when CHANGE_PASSWORD_FAILED action is called with test', () => {
    const newState = updatePasswordReducer(undefined, {
      type: ActionTypes.CHANGE_PASSWORD_FAILED as ActionType,
      data: 'error',
    })
    const expected = {
      ...defaultState,
      loading: false,
      errorMessage: 'error',
    }
    expect(newState).toEqual(expected)
  })
})
