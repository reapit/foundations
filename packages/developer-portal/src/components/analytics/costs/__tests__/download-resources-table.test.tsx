import { render } from '@testing-library/react'
import React from 'react'
import { billingTransactionDownloadService } from '../../../../services/billing'
import { mockMonthlyBillingData } from '../../../../tests/__stubs__/billing'
import { defaultAnalyticsFilterState } from '../../state/defaults'
import { DownloadResourcesTable, handleDownloadCSV, handleDownloadTransactions } from '../download-resources-table'
import fileSaver from 'file-saver'

jest.mock('../../state/use-analytics-state')

jest.mock('../../../../services/billing', () => ({
  billingTransactionDownloadService: jest.fn(() => true),
}))

jest.mock('file-saver', () => ({
  saveAs: jest.fn(() => true),
}))

const mockBillingTransactionDownloadService = billingTransactionDownloadService as jest.Mock

describe('DownloadResourcesTable', () => {
  it('should match a snapshot with billing', () => {
    expect(render(<DownloadResourcesTable billing={mockMonthlyBillingData} />)).toMatchSnapshot()
  })
})

describe('handleDownloadTransactions', () => {
  it('should correctly call the service', async () => {
    const analyticsFilterState = defaultAnalyticsFilterState
    const displayMonth = 'Apr 2022'
    const error = jest.fn()
    const developerId = 'MOCK_DEVELOPER_ID'
    const curried = handleDownloadTransactions(analyticsFilterState, displayMonth, error, developerId)

    await curried()

    expect(mockBillingTransactionDownloadService).toHaveBeenCalledWith(analyticsFilterState, displayMonth, developerId)
    expect(error).not.toHaveBeenCalled()
  })

  it('should correctly call the service and error on failure', async () => {
    mockBillingTransactionDownloadService.mockReturnValue(false)
    const analyticsFilterState = defaultAnalyticsFilterState
    const displayMonth = 'Apr 2022'
    const error = jest.fn()
    const developerId = 'MOCK_DEVELOPER_ID'
    const curried = handleDownloadTransactions(analyticsFilterState, displayMonth, error, developerId)

    await curried()

    expect(mockBillingTransactionDownloadService).toHaveBeenCalledWith(analyticsFilterState, displayMonth, developerId)
    expect(error).toHaveBeenCalledTimes(1)
  })
})

describe('handleDownloadCSV', () => {
  it('should correctly call the file saver', () => {
    const error = jest.fn()
    const curried = handleDownloadCSV(mockMonthlyBillingData, error)

    curried()

    expect(fileSaver.saveAs).toHaveBeenCalledWith(new Blob([], { type: 'text/csv;charset=utf-8;' }), 'billing.csv')
    expect(error).not.toHaveBeenCalled()
  })
})
