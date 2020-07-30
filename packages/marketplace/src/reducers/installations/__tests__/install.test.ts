import { installReducer, defaultState } from '../install'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'

describe('installApp reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = installReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set state to test when INSTALL_APP action is called with test', () => {
    const newState = installReducer(undefined, {
      type: ActionTypes.INSTALL_APP as ActionType,
      data: undefined,
    })
    const expected = {
      ...defaultState,
      isLoading: true,
      errorMessage: '',
    }
    expect(newState).toEqual(expected)
  })

  it('should set state to test when INSTALL_APP_SUCCESS action is called with test', () => {
    const newState = installReducer(undefined, {
      type: ActionTypes.INSTALL_APP_SUCCESS as ActionType,
      data: undefined,
    })
    const expected = {
      ...defaultState,
      isLoading: false,
      errorMessage: '',
    }
    expect(newState).toEqual(expected)
  })

  it('should set state to test when INSTALL_APP_FAILED action is called with test', () => {
    const newState = installReducer(undefined, {
      type: ActionTypes.INSTALL_APP_FAILED as ActionType,
      data: 'mockError',
    })
    const expected = {
      ...defaultState,
      isLoading: false,
      errorMessage: 'mockError',
    }
    expect(newState).toEqual(expected)
  })
})
