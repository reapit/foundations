import { ReduxState } from '@/types/core'
import { featuredAppsDataStub } from '@/sagas/__stubs__/apps'
import { selectFeaturedApps, selectInstalledApps, selectInstalledAppsForLaunch } from '../app'

describe('app', () => {
  describe('selectFeaturedApps', () => {
    it('should run correctly', () => {
      const input = {
        client: {
          appSummary: {
            data: {
              featuredApps: featuredAppsDataStub.data,
            },
          },
        },
      } as ReduxState
      const result = selectFeaturedApps(input)
      expect(result).toEqual(featuredAppsDataStub.data)
    })

    it('should run correctly and return []', () => {
      const input = {
        client: {
          appSummary: {
            data: null,
          },
        },
      } as ReduxState
      const result = selectFeaturedApps(input)
      expect(result).toEqual([])
    })
  })

  describe('selectInstalledAppsForLaunch', () => {
    it('should selectInstalledAppsForLaunch run correctly and return true', () => {
      const input = {
        installedApps: {},
      } as ReduxState
      const result = selectInstalledAppsForLaunch(input)
      expect(result).toEqual({})
    })
  })

  describe('selectInstalledApps', () => {
    it('should run correctly and return {}', () => {
      const input = {
        myApps: {},
      } as ReduxState
      const result = selectInstalledApps(input)
      expect(result).toEqual(input.myApps)
    })
  })
})
