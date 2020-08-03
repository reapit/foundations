import appsReducer, { defaultState } from '@/reducers/apps'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'

describe('appsReducer - statistics', () => {
  it('should return default state if action not matched', () => {
    const newState = appsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set isLoading to true when FETCH_STATISTICS action is called', () => {
    const newState = appsReducer(undefined, {
      type: ActionTypes.FETCH_STATISTICS as ActionType,
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

  it('should set data when FETCH_STATISTICS_SUCCES action is called', () => {
    const newState = appsReducer(undefined, {
      type: ActionTypes.FETCH_STATISTICS_SUCCES as ActionType,
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

  it('should clear approvals list data when FETCH_STATISTICS_FAILED action is called', () => {
    const newState = appsReducer(undefined, {
      type: ActionTypes.FETCH_STATISTICS_FAILED as ActionType,
      data: 'error',
    })
    const expected = {
      ...defaultState,
      statistics: {
        ...defaultState.statistics,
        isLoading: false,
        errorMessage: 'error',
      },
    }
    expect(newState).toEqual(expected)
  })
})
