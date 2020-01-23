import MockDate from 'mockdate'
import { getDateRange, getDataLabel, getChartConfig, numOfObjectCreatedInDate } from '../admin-stats'

beforeEach(() => {
  MockDate.set(new Date(2020, 1, 21))
})

afterEach(() => {
  MockDate.reset()
})

describe('admin stats utils', () => {
  describe('getDataLabel', () => {
    it('should run correctly', () => {
      expect(getDataLabel('APPS')).toEqual('Apps')
      expect(getDataLabel('DEVELOPERS')).toEqual('Developers')
      expect(getDataLabel('INSTALLATIONS')).toEqual('Installations')
    })
  })

  describe('getDateRange', () => {
    it('should run correctly', () => {
      const weekRange = { from: new Date(2020, 1, 14), to: new Date(2020, 1, 21) }
      const monthRange = { from: new Date(2020, 1, 1), to: new Date(2020, 1, 21) }
      expect(getDateRange('WEEK')).toEqual(weekRange)
      expect(getDateRange('MONTH')).toEqual(monthRange)
    })
  })

  describe('numOfObjectCreatedInDate', () => {
    it('should run correctly', () => {
      const data = [
        { id: 1, created: new Date(2020, 1, 14) },
        { id: 2, created: new Date(2020, 1, 15) },
        { id: 3, created: new Date(2020, 1, 16) }
      ]
      const date = new Date(2020, 1, 14)
      expect(numOfObjectCreatedInDate(data, date)).toEqual(1)
    })
  })

  describe('getChartConfig', () => {
    it('should run correctly', () => {
      const labels = ['Mon', 'Tue']
      const data = [10, 20]
      const chartConfig = getChartConfig(labels, data, 'DEVELOPERS')
      expect(chartConfig.labels.length).toBe(2)
      expect(chartConfig.datasets[0].data.length).toBe(2)
    })
  })
})
