import { ReduxState } from '@/types/core'
import {
  selectDeveloperEditionId,
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

describe('selectDeveloperEditionId', () => {
  it('should run correctly when user in AgencyCloudDeveloperEdition group', () => {
    const input = {
      auth: {
        loginSession: {
          loginIdentity: {
            clientId: '123',
            email: 'abc@gmail.com',
            developerId: '1234',
            groups: ['AgencyCloudDeveloperEdition'],
          },
        },
      },
    } as ReduxState
    const result = selectDeveloperEditionId(input)
    expect(result).toEqual('1234')
  })

  it('should run correctly when user NOT in AgencyCloudDeveloperEdition group', () => {
    const input = {
      auth: {
        loginSession: {
          loginIdentity: {
            clientId: '123',
            email: 'abc@gmail.com',
            developerId: '1234',
            groups: [''],
          },
        },
      },
    } as ReduxState
    const result = selectDeveloperEditionId(input)
    expect(result).toEqual(null)
  })
})

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
