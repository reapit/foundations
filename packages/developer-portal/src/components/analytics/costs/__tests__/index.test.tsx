import React from 'react'
import { batchFetchBillingService } from '../../../../services/billing'
import { render } from '../../../../tests/react-testing'
import { mockMonthlyBillingData } from '../../../../tests/__stubs__/billing'
import { defaultAnalyticsFilterState } from '../../state/defaults'
import { AnalyticsCosts, handleFetchBilling } from '../index'

jest.mock('react-chartjs-2', () => ({
  Chart: () => <div></div>,
}))

jest.mock('../../state/use-analytics-state')

jest.mock('../../../../services/billing', () => ({
  batchFetchBillingService: jest.fn(() => [mockMonthlyBillingData]),
}))

const mockBatchFetchBillingService = batchFetchBillingService as jest.Mock

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      loginIdentity: {
        developerId: 'MOCK_DEVELOPER_ID',
      },
    },
  })),
}))

describe('AnalyticsCosts', () => {
  it('should match snapshot where billing is returned', () => {
    expect(render(<AnalyticsCosts />)).toMatchSnapshot()
  })

  it('should match snapshot where no billing is returned', () => {
    mockBatchFetchBillingService.mockReturnValueOnce(false)
    expect(render(<AnalyticsCosts />)).toMatchSnapshot()
  })
})

describe('handleFetchBilling', () => {
  it('should set billing data if returned', async () => {
    const analyticsFilterState = defaultAnalyticsFilterState
    const setBillingState = jest.fn()
    const error = jest.fn()
    const developerId = 'MOCK_DEVELOPER_ID'
    const curried = handleFetchBilling(analyticsFilterState, setBillingState, error, developerId)

    curried()

    await new Promise((resolve) => resolve(true))

    expect(setBillingState).toHaveBeenLastCalledWith({
      billing: [mockMonthlyBillingData],
      loading: false,
    })

    expect(error).not.toHaveBeenCalled()
  })

  it('should set error if fails', async () => {
    mockBatchFetchBillingService.mockReturnValueOnce(false)
    const analyticsFilterState = defaultAnalyticsFilterState
    const setBillingState = jest.fn()
    const error = jest.fn()
    const developerId = 'MOCK_DEVELOPER_ID'
    const curried = handleFetchBilling(analyticsFilterState, setBillingState, error, developerId)

    curried()

    await new Promise((resolve) => resolve(true))

    expect(setBillingState).toHaveBeenLastCalledWith({
      billing: [],
      loading: false,
    })

    expect(error).toHaveBeenCalled()
  })
})
