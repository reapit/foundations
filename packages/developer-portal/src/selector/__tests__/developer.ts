import { ReduxState } from '@/types/core'
import {
  selectDeveloperEmail,
  selectDeveloper,
  selectMyIdentity,
  selectBilling,
  selectDeveloperLoading,
  selectIsServiceChartLoading,
  selectMonthlyBilling,
  selectMonthlyBillingLoading,
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

describe('selectBilling', () => {
  it('should run correctly', () => {
    const input = {
      developer: {
        isServiceChartLoading: false,
        billing: {},
      },
    } as ReduxState
    const result = selectBilling(input)
    expect(result).toEqual(input.developer.billing)
  })

  it('should run correctly and return null', () => {
    const input = {} as ReduxState
    const result = selectBilling(input)
    expect(result).toEqual(null)
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

describe('selectMonthlyBillingLoading', () => {
  it('should run correctly', () => {
    const input = {
      developer: {
        isMonthlyBillingLoading: true,
      },
    } as ReduxState
    const result = selectMonthlyBillingLoading(input)
    expect(result).toEqual(true)
  })

  it('should run correctly and return null', () => {
    const input = {} as ReduxState
    const result = selectMonthlyBillingLoading(input)
    expect(result).toEqual(undefined)
  })
})

describe('selectMonthlyBilling', () => {
  it('should run correctly', () => {
    const input = {
      developer: {
        isServiceChartLoading: false,
        monthlyBilling: {},
      },
    } as ReduxState
    const result = selectMonthlyBilling(input)
    expect(result).toEqual(input.developer.monthlyBilling)
  })

  it('should run correctly and return undefined', () => {
    const input = {} as ReduxState
    const result = selectMonthlyBilling(input)
    expect(result).toEqual({})
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
