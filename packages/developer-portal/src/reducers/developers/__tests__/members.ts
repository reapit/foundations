import membersReducer, { defaultState } from '../members'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'

describe('members reducer', () => {
  it('should return default state', () => {
    const newState = membersReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })
  it('should return state with loading is true', () => {
    const newState = membersReducer(undefined, {
      type: ActionTypes.ORGANISATION_FETCH_MEMBERS as ActionType,
      data: undefined,
    })
    expect(newState).toEqual({ ...defaultState, loading: true })
  })
  it('should return state with loading is false, data is {}', () => {
    const newState = membersReducer(undefined, {
      type: ActionTypes.ORGANISATION_FETCH_MEMBERS_SUCCESS as ActionType,
      data: {},
    })
    expect(newState).toEqual({ ...defaultState, loading: false, pagedResult: {} })
  })
  it('should return state with loading is false, data is {}', () => {
    const newState = membersReducer(undefined, {
      type: ActionTypes.ORGANISATION_FETCH_MEMBERS_FAILED as ActionType,
      data: {},
    })
    expect(newState).toEqual({ ...defaultState, loading: false, pagedResult: null })
  })
})
