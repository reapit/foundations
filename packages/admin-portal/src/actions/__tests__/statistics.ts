import {
  statisticsRequestData,
  statisticsReceiveData,
  statisticsRequestFailure,
  StatisticsRequestParams,
  StatisticsReceiveParams,
} from '../statistics'
import ActionTypes from '../../constants/action-types'

describe('adminStats actions', () => {
  it('should create a statisticsRequestData action', () => {
    expect(statisticsRequestData.type).toEqual(ActionTypes.STATISTICS_REQUEST_DATA)
    const params: StatisticsRequestParams = { area: 'APPS', range: 'WEEK' }
    expect(statisticsRequestData(params).data).toEqual(params)
  })

  it('should create a statisticsReceiveData action', () => {
    expect(statisticsReceiveData.type).toEqual(ActionTypes.STATISTICS_RECEIVE_DATA)
    const params: StatisticsReceiveParams = { data: [], totalCount: 1 }
    expect(statisticsReceiveData(params).data).toEqual(params)
  })

  it('should create a statisticsRequestFailure action', () => {
    expect(statisticsRequestFailure.type).toEqual(ActionTypes.STATISTICS_REQUEST_DATA_FAILURE)
  })
})
