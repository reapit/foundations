import { ReduxState } from '@/types/core'
import {
  selectDeveloperEmail,
  selectDeveloper,
  selectMyIdentity,
  selectDeveloperLoading,
  selectIsServiceChartLoading,
  selectWebhookTestStatus,
} from '../developer'

describe('selectDeveloperEmail', () => {
  it('should run correctly', () => {
    const input = {
      settings: {
        developerInfomation: {
          email: 'abc@gmail.com',
        },
      },
    } as ReduxState
    const result = selectDeveloperEmail(input)
    expect(result).toEqual('abc@gmail.com')
  })

  it('should run correctly and return undefined', () => {
    const input = {} as ReduxState
    const result = selectDeveloperEmail(input)
    expect(result).toEqual(undefined)
  })
})

describe('selectDeveloper', () => {
  it('should run correctly', () => {
    const input = {
      developer: {
        isServiceChartLoading: false,
      },
    } as ReduxState
    const result = selectDeveloper(input)
    expect(result).toEqual(input.developer)
  })

  it('should run correctly and return undefined', () => {
    const input = {} as ReduxState
    const result = selectDeveloper(input)
    expect(result).toEqual(undefined)
  })
})

describe('selectMyIdentity', () => {
  it('should run correctly', () => {
    const input = {
      developer: {
        isServiceChartLoading: false,
        myIdentity: {},
      },
    } as ReduxState
    const result = selectMyIdentity(input)
    expect(result).toEqual(input.developer.myIdentity)
  })

  it('should run correctly and return {}', () => {
    const input = {} as ReduxState
    const result = selectMyIdentity(input)
    expect(result).toEqual({})
  })
})

describe('selectDeveloperLoading', () => {
  it('should run correctly', () => {
    const input = {
      developer: {
        loading: true,
      },
    } as ReduxState
    const result = selectDeveloperLoading(input)
    expect(result).toEqual(true)
  })

  it('should run correctly and return null', () => {
    const input = {} as ReduxState
    const result = selectDeveloperLoading(input)
    expect(result).toEqual(undefined)
  })
})

describe('selectIsServiceChartLoading', () => {
  it('should run correctly', () => {
    const input = {
      developer: {
        isServiceChartLoading: true,
      },
    } as ReduxState
    const result = selectIsServiceChartLoading(input)
    expect(result).toEqual(true)
  })

  it('should run correctly and return null', () => {
    const input = {} as ReduxState
    const result = selectIsServiceChartLoading(input)
    expect(result).toEqual(undefined)
  })
})

describe('selectWebhookTestStatus', () => {
  it('should run correctly and return status', () => {
    const input = {
      developer: {
        webhookPingTestStatus: 'SUCCESS',
      },
    } as ReduxState
    const result = selectWebhookTestStatus(input)
    expect(result).toEqual('SUCCESS')
  })
})
