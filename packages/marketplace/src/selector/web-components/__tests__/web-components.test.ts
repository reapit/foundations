import { ReduxState } from '@/types/core'
import {
  selectWebComponentOpen,
  selectWebComponentData,
  selectWebComponentLoading,
  selectWebComponentUpdating,
  selectWebComponentNegotiators,
} from '../web-components'

describe('selectFeaturedApps', () => {
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
})
