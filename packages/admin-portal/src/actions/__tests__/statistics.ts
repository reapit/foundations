import {
  fetchStatisticsData,
  fetchStatisticsDataSucces,
  fetchStatisticsFailed,
  StatisticsRequestParams,
  StatisticsReceiveParams,
} from '../statistics'
import ActionTypes from '../../constants/action-types'

describe('adminStats actions', () => {
  it('should create a fetchStatisticsData action', () => {
    expect(fetchStatisticsData.type).toEqual(ActionTypes.FETCH_STATISTICS_DATA)
    const params: StatisticsRequestParams = { area: 'APPS', range: 'WEEK' }
    expect(fetchStatisticsData(params).data).toEqual(params)
  })

  it('should create a fetchStatisticsDataSucces action', () => {
    expect(fetchStatisticsDataSucces.type).toEqual(ActionTypes.FETCH_STATISTICS_DATA_SUCCES)
    const params: StatisticsReceiveParams = { data: [], totalCount: 1 }
    expect(fetchStatisticsDataSucces(params).data).toEqual(params)
  })

  it('should create a fetchStatisticsFailed action', () => {
    expect(fetchStatisticsFailed.type).toEqual(ActionTypes.FETCH_STATISTICS_FAILED)
  })
})
