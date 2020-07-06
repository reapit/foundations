import { httpTrafficPerDayStub } from '@/sagas/__stubs__/app-http-traffic-event'
import { getAppHttpTrafficPerDayChartData, getChartOptions, getChartConfig } from '../app-http-traffic'

describe('HttpTrafficPerDayChart', () => {
  describe('getAppHttpTrafficPerDayChartData', () => {
    const data = getAppHttpTrafficPerDayChartData(httpTrafficPerDayStub.requestsByDate || [])
    expect(data).toEqual({
      labels: ['2020-04-04', '2020-04-05'],
      data: [4, 65],
      chartDataStats: [
        {
          date: '2020-04-04',
          requestCount: 4,
        },
        {
          date: '2020-04-05',
          requestCount: 65,
        },
      ],
    })
  })
  describe('getChartOptions', () => {
    it('should run correctly', () => {
      const result = getAppHttpTrafficPerDayChartData(httpTrafficPerDayStub.requestsByDate || [])
      const options = getChartOptions(result?.chartDataStats)
      expect(options.tooltips).not.toBeNull()
    })
  })
  describe('getChartConfig', () => {
    it('should run correctly', () => {
      const result = getAppHttpTrafficPerDayChartData(httpTrafficPerDayStub.requestsByDate || [])
      const configs = getChartConfig(result?.labels, result?.data)
      expect(configs).not.toBeNull()
    })
  })
})
