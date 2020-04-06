import {
  httpTrafficPerDayRequestData,
  httpTrafficPerDayReceiveData,
  httpTrafficPerDayRequestDataFailure,
} from '../app-http-traffic-event'
import ActionTypes from '@/constants/action-types'
import { httpTrafficPerDayStub } from '@/sagas/__stubs__/app-http-traffic-event'

describe('app-http-traffic-per-day actions', () => {
  it('should create a httpTrafficPerDayRequestData action', () => {
    expect(httpTrafficPerDayRequestData.type).toEqual(ActionTypes.HTTP_TRAFFIC_PER_DAY_REQUEST_DATA)
    expect(
      httpTrafficPerDayRequestData({
        applicationId: '1',
        params: {
          dateFrom: '2020-02-17T10:27:44Z',
        },
      }),
    ).toEqual({ applicationId: '1' })
  })
  it('should create a httpTrafficPerDayReceiveData action', () => {
    expect(httpTrafficPerDayReceiveData.type).toEqual(ActionTypes.HTTP_TRAFFIC_PER_DAY_RECEIVE_DATA)
    expect(httpTrafficPerDayReceiveData(httpTrafficPerDayStub).data).toEqual(httpTrafficPerDayStub)
  })
  it('should create a httpTrafficPerDayRequestDataFailure action', () => {
    expect(httpTrafficPerDayRequestDataFailure.type).toEqual(ActionTypes.HTTP_TRAFFIC_PER_DAY_REQUEST_FAILURE)
  })
})
