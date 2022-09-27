import React from 'react'
import Papa from 'papaparse'
import FileSaver from 'file-saver'
import { handleDownloadCSV, handleDownloadCSVClick, Statistics } from '../index'
import { mockBillingBreakdownForMonthV2Model } from '../../../tests/__stubs__/billing'
import { render } from '../../../tests/react-testing'
import { mockAppSummaryModelPagedResult } from '../../../tests/__stubs__/apps'
import { mockInstallationModelPagedResult } from '../../../tests/__stubs__/installations'
import { mockDeveloperModelPagedResult } from '../../../tests/__stubs__/developers'
import { mockSubscriptionModelPagedResult } from '../../../tests/__stubs__/subscriptions'

jest.mock('file-saver', () => ({
  __esModule: true,
  default: {
    saveAs: jest.fn(),
  },
}))

jest.mock('papaparse', () => ({
  __esModule: true,
  default: {
    unparse: jest.fn(),
  },
}))

describe('Statistics', () => {
  it('should render component with billing', () => {
    expect(
      render(
        <Statistics area="BILLING" data={mockBillingBreakdownForMonthV2Model.services ?? []} setPageSize={jest.fn()} />,
      ),
    ).toMatchSnapshot()
  })

  it('should render component with apps', () => {
    expect(
      render(
        <Statistics area="APPS" data={{ ...mockAppSummaryModelPagedResult, pageSize: 9999 }} setPageSize={jest.fn()} />,
      ),
    ).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

describe('handleDownloadCSV', () => {
  it('handleDownloadCSV should download a file for APPS', () => {
    const setPageSize = jest.fn()
    const curried = handleDownloadCSV('APPS', mockAppSummaryModelPagedResult.data ?? [], setPageSize)

    curried()

    expect(FileSaver.saveAs).toHaveBeenCalledTimes(1)
    expect(Papa.unparse).toHaveBeenCalledTimes(1)
    expect(setPageSize).toHaveBeenCalledWith(12)
  })

  it('handleDownloadCSV should download a file for INSTALLATIONS', () => {
    const setPageSize = jest.fn()
    const curried = handleDownloadCSV('INSTALLATIONS', mockInstallationModelPagedResult.data ?? [], setPageSize)

    curried()

    expect(FileSaver.saveAs).toHaveBeenCalledTimes(1)
    expect(Papa.unparse).toHaveBeenCalledTimes(1)
    expect(setPageSize).toHaveBeenCalledWith(12)
  })

  it('handleDownloadCSV should download a file for DEVELOPERS', () => {
    const setPageSize = jest.fn()
    const curried = handleDownloadCSV('DEVELOPERS', mockDeveloperModelPagedResult.data ?? [], setPageSize)

    curried()

    expect(FileSaver.saveAs).toHaveBeenCalledTimes(1)
    expect(Papa.unparse).toHaveBeenCalledTimes(1)
    expect(setPageSize).toHaveBeenCalledWith(12)
  })

  it('handleDownloadCSV should download a file for BILLING', () => {
    const setPageSize = jest.fn()
    const curried = handleDownloadCSV('BILLING', mockBillingBreakdownForMonthV2Model.services ?? [], setPageSize)

    curried()

    expect(FileSaver.saveAs).toHaveBeenCalledTimes(1)
    expect(Papa.unparse).toHaveBeenCalledTimes(1)
  })

  it('handleDownloadCSV should download a file for SUBSCRIPTIONS', () => {
    const setPageSize = jest.fn()
    const curried = handleDownloadCSV('SUBSCRIPTIONS', mockSubscriptionModelPagedResult.data ?? [], setPageSize)

    curried()

    expect(FileSaver.saveAs).toHaveBeenCalledTimes(1)
    expect(Papa.unparse).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

describe('handleDownloadCSVClick', () => {
  it('handleDownloadCSVClick should correctly handle billing', () => {
    const area = 'BILLING'
    const data = mockBillingBreakdownForMonthV2Model.services ?? []
    const setCsvData = jest.fn()
    const setPageSize = jest.fn()
    const curried = handleDownloadCSVClick(area, data, setCsvData, setPageSize)

    curried()

    expect(setCsvData).toHaveBeenCalledWith(data)
    expect(setPageSize).not.toHaveBeenCalled()
  })

  it('handleDownloadCSVClick should correctly handle apps', () => {
    const area = 'APPS'
    const data = mockAppSummaryModelPagedResult ?? []
    const setCsvData = jest.fn()
    const setPageSize = jest.fn()
    const curried = handleDownloadCSVClick(area, data, setCsvData, setPageSize)

    curried()

    expect(setCsvData).not.toHaveBeenCalled()
    expect(setPageSize).toHaveBeenCalledWith(9999)
  })
})
