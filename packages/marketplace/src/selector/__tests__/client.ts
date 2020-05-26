import { ReduxState } from '@/types/core'
import {
  selectClientId,
  selectLoggedUserEmail,
  selectFeaturedApps,
  selectIsWebComponentOpen,
  selectIsWebComponentData,
  selectIsWebComponentLoading,
  selectIsWebComponentUpdating,
  selectIsWebComponentNegotiators,
  selectAppDetail
} from '../client'

import { featuredAppsDataStub } from '@/sagas/__stubs__/apps'

describe('selectClientId', () => {
  it('should run correctly', () => {
    const input = {
      auth: {
        loginSession: {
          loginIdentity: {
            clientId: '123',
            email: 'abc@gmail.com',
          },
        },
      },
    } as ReduxState
    const result = selectClientId(input)
    expect(result).toEqual('123')
  })

  it('should run correctly and return undefined', () => {
    const input = {} as ReduxState
    const result = selectClientId(input)
    expect(result).toEqual('')
  })
})

describe('selectLoggedUserEmail', () => {
  it('should run correctly', () => {
    const input = {
      auth: {
        loginSession: {
          loginIdentity: {
            clientId: '',
            email: 'abc@gmail.com',
          },
        },
      },
    } as ReduxState
    const result = selectLoggedUserEmail(input)
    expect(result).toEqual('abc@gmail.com')
  })

  it('should run correctly and return undefined', () => {
    const input = {} as ReduxState
    const result = selectLoggedUserEmail(input)
    expect(result).toEqual(undefined)
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

  it('should selectIsWebComponentOpen run correctly and return true', () => {
    const input = {
      client: {
        webComponent: {
          isShowModal: true,
        },
      },
    } as ReduxState
    const result = selectIsWebComponentOpen(input)
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
    const result = selectIsWebComponentData(input)
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
    const result = selectIsWebComponentLoading(input)
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
    const result = selectIsWebComponentUpdating(input)
    expect(result).toEqual(true)
  })

  it('should selectIsWebComponentNegotiators run correctly and return true', () => {
    const input = {
      client: {
        webComponent: {
          updating: true,
          negotiators: null,
        },
      },
    } as ReduxState
    const result = selectIsWebComponentNegotiators(input)
    expect(result).toEqual([])
  })
  it('should run correctly and return {}', () => {
    const input = {
      appDetail: {},
    } as ReduxState
    const result = selectAppDetail(input)
    expect(result).toEqual(input.appDetail)
  })
})
