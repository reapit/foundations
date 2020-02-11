import * as React from 'react'
import { shallow } from 'enzyme'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { usageStatsDataStub } from '@/sagas/__stubs__/app-usage-stats'
import { getAppUsageStatsChartData, getChartConfig, getChartOptions } from '@/utils/app-usage-stats.ts'
import DeveloperTrafficChart, { DeveloperTrafficChartProps } from '../developer-traffic-chart'

const props: DeveloperTrafficChartProps = {
  apps: appsDataStub.data,
  stats: usageStatsDataStub,
}

describe('DeveloperTrafficChart', () => {
  it('should match a snapshot', () => {
    expect(shallow(<DeveloperTrafficChart {...props} />)).toMatchSnapshot()
  })

  describe('getAppUsageStatsChartData', () => {
    it('should run correctly', () => {
      const { stats, apps } = props
      const result = getAppUsageStatsChartData(stats.appUsage, apps.data)
      const expected = {
        labels: ['15/11/2019'],
        data: [5],
        appUsageStatsGroupedByDate: {
          '15/11/2019': {
            '09043eb8-9e5e-4650-b7f1-f0cb62699027': { appName: 'test', requests: 5 },
            date: new Date('2019-11-15T00:00:00+00:00'),
            totalRequests: 5,
          },
        },
      }
      expect(result).toEqual(expected)
    })

    describe('getChartOptions', () => {
      it('should run correctly', () => {
        const { stats, apps } = props
        const result = getAppUsageStatsChartData(stats.appUsage, apps.data)
        const options = getChartOptions(result?.appUsageStatsGroupedByDate)
        expect(options.tooltips).not.toBeNull()
      })
    })

    describe('getChartConfig', () => {
      it('should run correctly', () => {
        const { stats, apps } = props
        const result = getAppUsageStatsChartData(stats.appUsage, apps.data)
        const configs = getChartConfig(result?.labels, result?.data)
        expect(configs).not.toBeNull()
      })
    })
  })
})
