import appsReducer, { defaultState } from '@/reducers/apps'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'

describe('appsReducer - statistics', () => {
  it('should return default state if action not matched', () => {
    const newState = appsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set isLoading to true when STATISTICS_REQUEST_DATA action is called', () => {
    const newState = appsReducer(undefined, {
      type: ActionTypes.STATISTICS_REQUEST_DATA as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      statistics: {
        ...defaultState.statistics,
        isLoading: true,
      },
    }
    expect(newState).toEqual(expected)
  })

  it('should set data when STATISTICS_RECEIVE_DATA action is called', () => {
    const newState = appsReducer(undefined, {
      type: ActionTypes.STATISTICS_RECEIVE_DATA as ActionType,
      data: { data: [], totalCount: 0 },
    })
    const expected = {
      ...defaultState,
      statistics: {
        ...defaultState.statistics,
        isLoading: false,
      },
    }
    expect(newState).toEqual(expected)
  })

  it('should clear approvals list data when STATISTICS_REQUEST_DATA_FAILURE action is called', () => {
    const newState = appsReducer(undefined, {
      type: ActionTypes.STATISTICS_REQUEST_DATA_FAILURE as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      statistics: {
        ...defaultState.statistics,
        isLoading: false,
      },
    }
    expect(newState).toEqual(expected)
  })
})
