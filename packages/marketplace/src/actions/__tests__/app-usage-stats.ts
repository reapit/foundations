import { appUsageStatsReceiveData, appUsageStatsRequestData, appUsageStatsRequestDataFailure } from '../app-usage-stats'
import ActionTypes from '@/constants/action-types'
import { usageStatsDataStub } from '@/sagas/__stubs__/app-usage-stats'

describe('app-usage-stats actions', () => {
  it('should create a appUsageStatsRequestData action', () => {
    expect(appUsageStatsRequestData.type).toEqual(ActionTypes.APP_USAGE_STATS_REQUEST_DATA)
    expect(appUsageStatsRequestData({ id: ['1'] }).data).toEqual({ id: ['1'] })
  })
  it('should create a appUsageStatsReceiveData action', () => {
    expect(appUsageStatsReceiveData.type).toEqual(ActionTypes.APP_USAGE_STATS_RECEIVE_DATA)
    expect(appUsageStatsReceiveData(usageStatsDataStub).data).toEqual(usageStatsDataStub)
  })
  it('should create a appUsageStatsRequestDataFailure action', () => {
    expect(appUsageStatsRequestDataFailure.type).toEqual(ActionTypes.APP_USAGE_STATS_REQUEST_DATA_FAILURE)
  })
})
