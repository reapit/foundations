import appHttpTrafficEventReducer, { defaultState } from '../app-http-traffic-event'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { httpTrafficPerDayStub } from '@/sagas/__stubs__/app-http-traffic-event'

describe('app-http-traffic-event reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = appHttpTrafficEventReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should return loading true when HTTP_TRAFFIC_PER_DAY_REQUEST_DATA action is called', () => {
    const newState = appHttpTrafficEventReducer(defaultState, {
      type: ActionTypes.HTTP_TRAFFIC_PER_DAY_REQUEST_DATA as ActionType,
      data: {
        applicationId: '4fbbb1e8-bad0-43a2-98f9-bfb9bba366e7',
        params: {
          dateFrom: '2020-02-17T10:27:44Z',
        },
      },
    })
    const expected = {
      ...defaultState,
      perDayLoading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should return installationsAppData when HTTP_TRAFFIC_PER_DAY_RECEIVE_DATA action is called', () => {
    const newState = appHttpTrafficEventReducer(defaultState, {
      type: ActionTypes.HTTP_TRAFFIC_PER_DAY_RECEIVE_DATA as ActionType,
      data: httpTrafficPerDayStub,
    })
    const expected = {
      ...defaultState,
      appHttpTrafficPerDay: httpTrafficPerDayStub,
    }
    expect(newState).toEqual(expected)
  })

  it('should return loading false when HTTP_TRAFFIC_PER_DAY_REQUEST_DATA_FAILURE action is called', () => {
    const newState = appHttpTrafficEventReducer(defaultState, {
      type: ActionTypes.HTTP_TRAFFIC_PER_DAY_REQUEST_FAILURE as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      perDayLoading: false,
    }
    expect(newState).toEqual(expected)
  })
})
