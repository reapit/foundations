import adminReducer, { defaultState } from '../admin'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'

describe('admin reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = adminReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when ADMIN_LOADING action is called', () => {
    const newState = adminReducer(undefined, { type: ActionTypes.ADMIN_LOADING as ActionType, data: true })
    const expected = {
      ...defaultState,
      loading: true
    }
    expect(newState).toEqual(expected)
  })

  it('should set adminRevisions data when ADMIN_RECEIVE_REVISIONS action is called', () => {
    const newState = adminReducer(undefined, {
      type: ActionTypes.ADMIN_RECEIVE_REVISIONS as ActionType,
      data: []
    })
    const expected = {
      ...defaultState,
      appRevisions: []
    }
    expect(newState).toEqual(expected)
  })
})
