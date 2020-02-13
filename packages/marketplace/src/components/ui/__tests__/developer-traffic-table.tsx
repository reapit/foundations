import * as React from 'react'
import { shallow } from 'enzyme'
import DeveloperTrafficTable, {
  DeveloperAppTrafficProps,
  generateUsageStatsData,
  AppUsageStats,
  calculateTotalRequest,
} from '../developer-traffic-table'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { usageStatsDataStub } from '@/sagas/__stubs__/app-usage-stats'

const props: DeveloperAppTrafficProps = {
  apps: appsDataStub.data,
  stats: usageStatsDataStub,
}

describe('DeveloperTrafficTable', () => {
  it('should match a snapshot', () => {
    expect(shallow(<DeveloperTrafficTable {...props} />)).toMatchSnapshot()
  })

  describe('generateUsageStatsData', () => {
    it('should run correctly', () => {
      const props = {
        apps: appsDataStub.data,
        stats: usageStatsDataStub,
      }
      const result = generateUsageStatsData(props)()
      const expected: AppUsageStats[] = [
        { appName: 'test', created: '2020-02-02T10:45:57', requests: 5 },
        { appName: 'asd', created: '2020-02-02T10:45:57', requests: 0 },
      ]
      expect(result).toEqual(expected)
    })

    it('should run correctly when not found apps data', () => {
      const props: DeveloperAppTrafficProps = {
        apps: {},
        stats: {},
      }
      const result = generateUsageStatsData(props)()
      expect(result).toEqual(undefined)
    })
  })

  describe('calculate total api request', () => {
    it('should run correctly', () => {
      const props = {
        apps: appsDataStub.data,
        stats: usageStatsDataStub,
      }
      const usageStatsData = generateUsageStatsData(props)()
      const result = calculateTotalRequest(usageStatsData)
      expect(result).toEqual(5)
    })
  })
})
