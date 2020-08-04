import {
  fetchStatistics,
  fetchStatisticsSucces,
  fetchStatisticsFailed,
  StatisticsRequestParams,
  StatisticsReceiveParams,
} from '../statistics'
import ActionTypes from '../../constants/action-types'

describe('adminStats actions', () => {
  it('should create a fetchStatistics action', () => {
    expect(fetchStatistics.type).toEqual(ActionTypes.FETCH_STATISTICS)
    const params: StatisticsRequestParams = { area: 'APPS', range: 'WEEK' }
    expect(fetchStatistics(params).data).toEqual(params)
  })

  it('should create a fetchStatisticsSucces action', () => {
    expect(fetchStatisticsSucces.type).toEqual(ActionTypes.FETCH_STATISTICS_SUCCES)
    const params: StatisticsReceiveParams = { data: [], totalCount: 1 }
    expect(fetchStatisticsSucces(params).data).toEqual(params)
  })

  it('should create a fetchStatisticsFailed action', () => {
    expect(fetchStatisticsFailed.type).toEqual(ActionTypes.FETCH_STATISTICS_FAILED)
  })
})
