import dayjs from 'dayjs'
import { installedAppsStub } from '@/components/ui/__stubs__/developer-installations-chart-data'
import { groupInstalledAppsByDate, getChartData, groupAppsByNameAndCount } from '../developer-analytics'

describe('developer-analytics utils', () => {
  describe('groupInstalledAppsByDate', () => {
    it('should run correctly', () => {
      const grouppedApps = groupInstalledAppsByDate(installedAppsStub)
      expect(grouppedApps).toHaveProperty('31/01/2020')
      expect(grouppedApps['31/01/2020'].length).toEqual(2)
      expect(grouppedApps['03/02/2020'].length).toEqual(1)
    })
  })

  describe('getChartData', () => {
    it('should run correctly', () => {
      const grouppedApps = groupInstalledAppsByDate(installedAppsStub)
      expect(getChartData(grouppedApps)).toEqual([2, 0, 0, 1])
    })
  })

  describe('groupAppsByNameAndCount', () => {
    it('should run correctly', () => {
      const formatedApps = installedAppsStub.map(app => ({
        ...app,
        createdDate: dayjs(app.created)
          .startOf('day')
          .toDate(),
      }))

      expect(groupAppsByNameAndCount(formatedApps)).toHaveProperty('062a376c-f5a3-46a0-a64b-e4bc6e5af2c1')
      expect(groupAppsByNameAndCount(formatedApps)['062a376c-f5a3-46a0-a64b-e4bc6e5af2c1'].count).toEqual(1)
      expect(groupAppsByNameAndCount(formatedApps)).toHaveProperty('062a376c-f5a3-46a0-a64b-e4bc6e5af2c2')
      expect(groupAppsByNameAndCount(formatedApps)['062a376c-f5a3-46a0-a64b-e4bc6e5af2c2'].count).toEqual(1)
      expect(groupAppsByNameAndCount(formatedApps)).toHaveProperty('062a376c-f5a3-46a0-a64b-e4bc6e5af2c3')
      expect(groupAppsByNameAndCount(formatedApps)['062a376c-f5a3-46a0-a64b-e4bc6e5af2c3'].count).toEqual(1)
    })
  })
})
