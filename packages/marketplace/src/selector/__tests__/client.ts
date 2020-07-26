import { ReduxState } from '@/types/core'
import {
  selectFeaturedApps,
  selectWebComponentOpen,
  selectWebComponentData,
  selectWebComponentLoading,
  selectWebComponentUpdating,
  selectWebComponentNegotiators,
  selectAppDetail,
  selectMyApps,
  selectInstalledApps,
} from '../client'
import { featuredAppsDataStub } from '@/sagas/__stubs__/apps'

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

  it('should run correctly and return [', () => {
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

  it('should selectInstalledApps run correctly and return true', () => {
    const input = {
      installedApps: {},
    } as ReduxState
    const result = selectInstalledApps(input)
    expect(result).toEqual({})
  })

  it('should selectIsWebComponentOpen run correctly and return true', () => {
    const input = {
      client: {
        webComponent: {
          isShowModal: true,
        },
      },
    } as ReduxState
    const result = selectWebComponentOpen(input)
    expect(result).toEqual(true)
  })

  it('should selectIsWebComponentData run correctly and return {}', () => {
    const input = {
      client: {
        webComponent: {
          data: {},
        },
      },
    } as ReduxState
    const result = selectWebComponentData(input)
    expect(result).toEqual({})
  })

  it('should selectIsWebComponentLoading run correctly and return true', () => {
    const input = {
      client: {
        webComponent: {
          loading: true,
        },
      },
    } as ReduxState
    const result = selectWebComponentLoading(input)
    expect(result).toEqual(true)
  })

  it('should selectIsWebComponentUpdating run correctly and return true', () => {
    const input = {
      client: {
        webComponent: {
          updating: true,
        },
      },
    } as ReduxState
    const result = selectWebComponentUpdating(input)
    expect(result).toEqual(true)
  })

  it('should selectIsWebComponentNegotiators run correctly and return true', () => {
    const input = {
      client: {
        webComponent: {
          updating: true,
          negotiators: {},
        },
      },
    } as ReduxState
    const result = selectWebComponentNegotiators(input)
    expect(result).toEqual([])
  })
  it('should run correctly and return {}', () => {
    const input = {
      appDetail: {},
    } as ReduxState
    const result = selectAppDetail(input)
    expect(result).toEqual(input.appDetail)
  })
  it('should run correctly and return {}', () => {
    const input = {
      myApps: {},
    } as ReduxState
    const result = selectMyApps(input)
    expect(result).toEqual(input.myApps)
  })
})
