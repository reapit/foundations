import {
  adminStatsRequestData,
  adminStatsReceiveData,
  adminStatsRequestFailure,
  AdminStatsRequestParams,
  AdminStatsReceiveParams
} from '../admin-stats'
import ActionTypes from '../../constants/action-types'

describe('adminStats actions', () => {
  it('should create a adminStatsRequestData action', () => {
    expect(adminStatsRequestData.type).toEqual(ActionTypes.ADMIN_STATS_REQUEST_DATA)
    const params: AdminStatsRequestParams = { area: 'APPS', range: 'WEEK' }
    expect(adminStatsRequestData(params).data).toEqual(params)
  })

  it('should create a adminStatsReceiveData action', () => {
    expect(adminStatsReceiveData.type).toEqual(ActionTypes.ADMIN_STATS_RECEIVE_DATA)
    const params: AdminStatsReceiveParams = { data: [], totalCount: 1 }
    expect(adminStatsReceiveData(params).data).toEqual(params)
  })

  it('should create a adminStatsRequestFailure action', () => {
    expect(adminStatsRequestFailure.type).toEqual(ActionTypes.ADMIN_STATS_REQUEST_DATA_FAILURE)
  })
})
