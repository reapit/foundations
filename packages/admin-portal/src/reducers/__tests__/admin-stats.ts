import adminStatsReducer, { defaultState } from '../admin-stats'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'

describe('admin stats reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = adminStatsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when ADMIN_STATS_REQUEST_DATA action is called', () => {
    const newState = adminStatsReducer(undefined, {
      type: ActionTypes.ADMIN_STATS_REQUEST_DATA as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      loading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set data when ADMIN_STATS_RECEIVE_DATA action is called', () => {
    const newState = adminStatsReducer(undefined, {
      type: ActionTypes.ADMIN_STATS_RECEIVE_DATA as ActionType,
      data: { data: [], totalCount: 0 },
    })
    const expected = {
      ...defaultState,
      result: { data: [], totalCount: 0 },
    }
    expect(newState).toEqual(expected)
  })

  it('should clear approvals list data when ADMIN_STATS_REQUEST_DATA_FAILURE action is called', () => {
    const newState = adminStatsReducer(undefined, {
      type: ActionTypes.ADMIN_STATS_REQUEST_DATA_FAILURE as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      loading: false,
    }
    expect(newState).toEqual(expected)
  })
})
