import { ReduxState } from '@/types/core'
import {
  selectDeveloperId,
  selectDeveloperEmail,
  selectDeveloper,
  selectDeveloperApps,
  selectMyIdentity,
  selectBilling,
  selectDeveloperLoading,
  selectIsServiceChartLoading,
  selectMonthlyBilling,
  selectMonthlyBillingLoading,
} from '../developer'

describe('selectDeveloperId', () => {
  it('should run correctly', () => {
    const input = {
      auth: {
        loginSession: {
          loginIdentity: {
            clientId: '',
            email: 'abc@gmail.com',
            developerId: '123',
          },
        },
      },
    } as ReduxState
    const result = selectDeveloperId(input)
    expect(result).toEqual('123')
  })

  it('should run correctly and return undefined', () => {
    const input = { auth: {} } as ReduxState
    const result = selectDeveloperId(input)
    expect(result).toEqual(undefined)
  })
})

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
        developerData: {},
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

describe('selectDeveloperApps', () => {
  it('should run correctly', () => {
    const input = {
      developer: {
        isServiceChartLoading: false,
        developerData: {
          data: {
            data: [{}],
          },
        },
      },
    } as ReduxState
    const result = selectDeveloperApps(input)
    expect(result).toEqual(input.developer.developerData?.data.data)
  })

  it('should run correctly and return []', () => {
    const input = {} as ReduxState
    const result = selectDeveloperApps(input)
    expect(result).toEqual([])
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
    expect(result).toEqual(undefined)
  })
})
