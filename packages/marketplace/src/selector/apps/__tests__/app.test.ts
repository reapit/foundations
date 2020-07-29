import { ReduxState } from '@/types/core'
import { featuredAppsDataStub } from '@/sagas/__stubs__/apps'
import { selectFeaturedApps } from '../app'

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
})
