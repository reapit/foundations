import appHttpTrafficEventReducer, { defaultState } from '../list'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { httpTrafficPerDayStub } from '@/sagas/__stubs__/app-http-traffic-event'

describe('app-http-traffic-event reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = appHttpTrafficEventReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should return loading true when FETCH_TRAFFIC_STATISTICS action is called', () => {
    const newState = appHttpTrafficEventReducer(defaultState, {
      type: ActionTypes.FETCH_TRAFFIC_STATISTICS as ActionType,
      data: {
        applicationId: ['4fbbb1e8-bad0-43a2-98f9-bfb9bba366e7'],
        dateFrom: '2020-02-17',
        dateTo: '2020-04-05',
      },
    })
    const expected = {
      ...defaultState,
      isLoading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should return installationsAppData when FETCH_TRAFFIC_STATISTICS_SUCCESS action is called', () => {
    const newState = appHttpTrafficEventReducer(defaultState, {
      type: ActionTypes.FETCH_TRAFFIC_STATISTICS_SUCCESS as ActionType,
      data: httpTrafficPerDayStub,
    })
    const expected = {
      ...defaultState,
      isLoading: false,
      data: httpTrafficPerDayStub,
    }
    expect(newState).toEqual(expected)
  })

  it('should return loading false when FETCH_TRAFFIC_STATISTICS_FAILURE action is called', () => {
    const newState = appHttpTrafficEventReducer(defaultState, {
      type: ActionTypes.FETCH_TRAFFIC_STATISTICS_FAILED as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      isLoading: false,
    }
    expect(newState).toEqual(expected)
  })
})
