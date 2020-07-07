import appUsageStatsReducer, { defaultState } from '../app-usage-stats'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { usageStatsDataStub } from '@/sagas/__stubs__/app-usage-stats'

describe('app-usage-stats reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = appUsageStatsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should return loading true when APP_USAGE_STATS_REQUEST_DATA action is called', () => {
    const newState = appUsageStatsReducer(defaultState, {
      type: ActionTypes.APP_USAGE_STATS_REQUEST_DATA as ActionType,
      data: { id: ['123'] },
    })
    const expected = {
      ...defaultState,
      loading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should return installationsAppData when APP_USAGE_STATS_RECEIVE_DATA action is called', () => {
    const newState = appUsageStatsReducer(defaultState, {
      type: ActionTypes.APP_USAGE_STATS_RECEIVE_DATA as ActionType,
      data: usageStatsDataStub,
    })
    const expected = {
      ...defaultState,
      appUsageStatsData: usageStatsDataStub,
    }
    expect(newState).toEqual(expected)
  })

  it('should return loading false when APP_USAGE_STATS_REQUEST_DATA_FAILURE action is called', () => {
    const newState = appUsageStatsReducer(defaultState, {
      type: ActionTypes.APP_USAGE_STATS_REQUEST_DATA_FAILURE as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      loading: false,
    }
    expect(newState).toEqual(expected)
  })
})
