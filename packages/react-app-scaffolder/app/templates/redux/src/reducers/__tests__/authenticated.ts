import authenticatedReducer, { defaultState } from '../authenticated'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'

describe('authenticated reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = authenticatedReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when AUTHENTICATED_LOADING action is called', () => {
    const newState = authenticatedReducer(undefined, {
      type: ActionTypes.AUTHENTICATED_LOADING as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      loading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set approvals list data when AUTHENTICATED_RECEIVE_DATA action is called', () => {
    const newState = authenticatedReducer(undefined, {
      type: ActionTypes.AUTHENTICATED_RECEIVE_DATA as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      authenticatedData: {},
    }
    expect(newState).toEqual(expected)
  })

  it('should clear approvals list data when AUTHENTICATED_CLEAR_DATA action is called', () => {
    const newState = authenticatedReducer(undefined, {
      type: ActionTypes.AUTHENTICATED_CLEAR_DATA as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      authenticatedData: null,
    }
    expect(newState).toEqual(expected)
  })
})
