import {
  fetchTrafficStatistics,
  fetchTrafficStatisticsSuccess,
  fetchTrafficStatisticsFailed,
} from '../traffic-statistics'
import ActionTypes from '@/constants/action-types'
import { httpTrafficPerDayStub } from '@/sagas/__stubs__/app-http-traffic-event'

describe('app-http-traffic-per-day actions', () => {
  it('should create a fetchTrafficStatistics action', () => {
    expect(fetchTrafficStatistics.type).toEqual(ActionTypes.FETCH_TRAFFIC_STATISTICS)
    expect(
      fetchTrafficStatistics({
        applicationId: ['1'],
        dateFrom: '2020-02-17',
        dateTo: '2020-04-05',
      }).data,
    ).toEqual({
      applicationId: ['1'],
      dateFrom: '2020-02-17',
      dateTo: '2020-04-05',
    })
  })
  it('should create a fetchTrafficStatisticsSuccess action', () => {
    expect(fetchTrafficStatisticsSuccess.type).toEqual(ActionTypes.FETCH_TRAFFIC_STATISTICS_SUCCESS)
    expect(fetchTrafficStatisticsSuccess(httpTrafficPerDayStub).data).toEqual(httpTrafficPerDayStub)
  })
  it('should create a fetchTrafficStatisticsFailed action', () => {
    expect(fetchTrafficStatisticsFailed.type).toEqual(ActionTypes.FETCH_TRAFFIC_STATISTICS_FAILED)
  })
})
