import { monthlyBillingData, subBilling, tableData } from '../__stubs__/analytics'
import {
  handleAutoSave,
  handleDownloadCSV,
  handleGetBilling,
  handleGetBillingByPeriod,
  handleGetSettings,
  handleOnSave,
  handleUpdateSettings,
  prepareTableColumns,
} from '../analytics-handlers'
import {
  convertTableDataToArray,
  flattenCostTableRows,
  formatCurrency,
  formatNumber,
  getAppHttpTrafficPerDayChartData,
  getDailyChartConfig,
  getDailyChartOptions,
  mapServiceChartDataSet,
  prepareTableData,
} from '../analytics-handlers'
import { saveAs } from 'file-saver'
import { getBillingByDatesService, getBillingByMonthService } from '../../../../services/billing'
import { getSettingsService, updateSettingsService } from '../../../../services/settings'
import { ReapitConnectSession } from '@reapit/connect-session'

jest.mock('file-saver', () => ({ saveAs: jest.fn() }))

jest.mock('../../../../services/settings', () => ({
  getSettingsService: jest.fn(() => ({})),
  updateSettingsService: jest.fn(() => true),
}))

jest.mock('../../../../services/billing', () => ({
  getBillingByMonthService: jest.fn(() => ({})),
  getBillingByDatesService: jest.fn(() => ({})),
}))

describe('prepareTableData', () => {
  it('should return correctly', () => {
    const { services = [] } = monthlyBillingData
    expect(prepareTableData(services)).toEqual(tableData)
  })

  it('should return correct data', () => {
    const { services = [] } = monthlyBillingData
    const input = [
      ...services,
      {
        cost: 7.975,
        itemCount: 7,
        amount: 638,
        items: [{ name: 'contacts', amount: 157, cost: 1.9625, itemCount: 2 }],
        name: 'TEST',
      },
    ]

    const expected = [
      {
        amount: 638,
        cost: 7.975,
        itemCount: null,
        name: 'API Requests',
        subRows: [{ name: 'contacts', amount: 157, cost: 1.9625, itemCount: null, subRows: [] }],
      },
      {
        cost: 7.975,
        itemCount: null,
        amount: 638,
        subRows: [{ name: 'contacts', amount: 157, cost: 1.9625, itemCount: null, subRows: [] }],
        name: 'TEST',
      },
    ]

    expect(prepareTableData(input)).toEqual(expected)
  })
})

describe('formatCurrency', () => {
  it('should return correctly', () => {
    expect(formatCurrency(14.489)).toEqual('£14.49')
  })

  it('should return correctly', () => {
    expect(formatCurrency(143.025, 2, 'en-US', 'USD')).toEqual('$143.03')
  })
})

describe('formatNumber', () => {
  it('should return correctly', () => {
    expect(formatNumber(14000)).toEqual('14,000')
  })
})

describe('convertTableDataToArray', () => {
  it('should return correctly', () => {
    const tableData = [
      {
        name: 'API Requests',
        amount: 0,
        cost: 0,
        itemCount: null,
        subRows: [],
      },
      {
        name: 'Reapit Connect',
        amount: 0,
        cost: 0,
        itemCount: null,
        subRows: [],
      },
      {
        name: 'Application Listing',
        amount: 1,
        cost: 49.5,
        itemCount: null,
        subRows: [
          {
            name: 'Application listing for TestApp',
            amount: 1,
            cost: 49.5,
            itemCount: null,
            subRows: [],
          },
        ],
      },
      {
        name: 'Developer Edition',
        amount: 22,
        cost: 3900,
        itemCount: null,
        subRows: [
          {
            name: 'Developer edition license for cbryan@reapit.com',
            amount: 22,
            cost: 3900,
            itemCount: null,
            subRows: [],
          },
        ],
      },
    ]

    const result = convertTableDataToArray(tableData, 3949)
    const expected = [
      ['Services', 'Cost Item (GBP)'],
      ['API Requests', 0],
      ['Reapit Connect', 0],
      ['Application Listing', 49.5],
      ['Developer Edition', 3900],
      ['Total Cost (GBP)', 3949],
    ]
    expect(result).toEqual(expected)
  })
})

describe('flattenCostTableRows', () => {
  it('should return correctly', () => {
    const tableData = [
      {
        name: 'API Requests',
        amount: 0,
        cost: 0,
        itemCount: null,
        subRows: [],
      },
      {
        name: 'Reapit Connect',
        amount: 0,
        cost: 0,
        itemCount: null,
        subRows: [],
      },
      {
        name: 'Application Listing',
        amount: 1,
        cost: 49.5,
        itemCount: null,
        subRows: [],
      },
      {
        name: 'Developer Edition',
        amount: 22,
        cost: 3900,
        itemCount: null,
        subRows: [],
      },
    ]

    const result = flattenCostTableRows(tableData)
    const expected = [
      ['API Requests', 0],
      ['Reapit Connect', 0],
      ['Application Listing', 49.5],
      ['Developer Edition', 3900],
    ]
    expect(result).toEqual(expected)
  })
})

describe('getAppHttpTrafficPerDayChartData', () => {
  const data = getAppHttpTrafficPerDayChartData(subBilling.periods || [])

  expect(data).toEqual({
    labels: ['2019-11', '2019-12', '2020-01', '2020-02', '2020-03', '2020-04', '2020-05'],
    data: [0, 0, 0, 0, 0, 0.3, 0.5],
    chartDataStats: [
      { date: '2019-11', requestCount: 0 },
      { date: '2019-12', requestCount: 0 },
      { date: '2020-01', requestCount: 0 },
      { date: '2020-02', requestCount: 0 },
      { date: '2020-03', requestCount: 0 },
      { date: '2020-04', requestCount: 0.3 },
      { date: '2020-05', requestCount: 0.5 },
    ],
  })
})

describe('getDailyChartOptions', () => {
  it('should return correctly', () => {
    const result = getAppHttpTrafficPerDayChartData(subBilling.periods || [])
    const options = getDailyChartOptions(result?.chartDataStats)
    expect(options.tooltips).not.toBeNull()
  })
})

describe('getDailyChartConfig', () => {
  it('should return correctly', () => {
    const result = getAppHttpTrafficPerDayChartData(subBilling.periods || [])
    const configs = getDailyChartConfig(result?.labels, result?.data)
    expect(configs).not.toBeNull()
  })
})

describe('mapServiceChartDataSet', () => {
  it('should return correctly', () => {
    const result = mapServiceChartDataSet(subBilling)
    const expected = {
      labels: [
        'November 2019',
        'December 2019',
        'January 2020',
        'February 2020',
        'March 2020',
        'April 2020',
        'May 2020',
      ],
      datasets: [
        {
          label: 'Data Warehouse',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [1, 0, 0, 0, 0, 0.3, 0.5],
          totalCost: 1.8,
        },
      ],
    }

    expect(result).toEqual(expected)
  })
})

describe('prepareTableColumns', () => {
  it('should return correctly', () => {
    const actual = JSON.stringify(prepareTableColumns(monthlyBillingData))
    const expected =
      '[{"Header":"Services","accessor":"name","columnProps":{"width":200},"Footer":"Total"},{"Header":"Cost","Footer":"£9.57"}]'

    expect(actual).toEqual(expected)
  })
})

describe('handleOnSave', () => {
  it('should handle save', () => {
    const mockSetMonth = jest.fn()
    const mockValues = { month: new Date('2020-12-01') }
    const curried = handleOnSave(mockSetMonth)
    curried(mockValues)
    expect(mockSetMonth).toHaveBeenCalledWith(mockValues.month)
  })
})

describe('handleAutoSave', () => {
  it('should handle auto save', () => {
    const mockOnSave = jest.fn()
    const mockValues = { month: new Date('2020-12-01') }
    const curried = handleAutoSave(mockOnSave)
    curried(mockValues)
    expect(mockOnSave).toHaveBeenCalledWith(mockValues)
  })
})

describe('handleDownloadCSV', () => {
  it('should handle auto save', () => {
    const mockValues = 'bob,bob,bob,bob'
    const curried = handleDownloadCSV(mockValues)
    curried()
    expect(saveAs).toHaveBeenCalledWith(new Blob([mockValues]), 'billing.csv')
  })
})

describe('handleGetBilling', () => {
  it('should get and set billing if there is a month value', async () => {
    const mockSetBilling = jest.fn()
    const mockSetBillingLoading = jest.fn()
    const mockSetMessageState = jest.fn()
    const mockMonth = new Date('2020-12-01')
    const curried = handleGetBilling(mockSetBilling, mockSetBillingLoading, mockSetMessageState, mockMonth)

    await curried()

    expect(mockSetBillingLoading).toHaveBeenCalledWith(true)
    expect(mockSetBilling).toHaveBeenCalledWith({})
    expect(mockSetBillingLoading).toHaveBeenLastCalledWith(false)
    expect(mockSetMessageState).not.toHaveBeenCalled()
  })

  it('should show an error message if fetching fails', async () => {
    const mockSetBilling = jest.fn()
    const mockSetBillingLoading = jest.fn()
    const mockSetMessageState = jest.fn()
    const mockMonth = new Date('2020-12-01')
    ;(getBillingByMonthService as jest.Mock).mockReturnValueOnce(undefined)

    const curried = handleGetBilling(mockSetBilling, mockSetBillingLoading, mockSetMessageState, mockMonth)

    await curried()

    expect(mockSetBillingLoading).toHaveBeenCalledWith(true)
    expect(mockSetBilling).not.toHaveBeenCalledWith({})
    expect(mockSetBillingLoading).toHaveBeenLastCalledWith(false)
    expect(mockSetMessageState).toHaveBeenCalledWith({
      errorMessage: 'Something went wrong fetching billing, please try again',
    })
  })
})

describe('handleGetBillingByPeriod', () => {
  it('should get and set billing if there is a month value', async () => {
    const mockSetBilling = jest.fn()
    const mockSetBillingLoading = jest.fn()
    const mockSetMessageState = jest.fn()
    const mockOrgId = 'SOME_ID'
    const mockDateFrom = new Date('2020-12-01')
    const mockDateTo = new Date('2020-12-31')
    const curried = handleGetBillingByPeriod(
      mockSetBilling,
      mockSetBillingLoading,
      mockSetMessageState,
      mockOrgId,
      mockDateFrom,
      mockDateTo,
    )

    await curried()

    expect(mockSetBillingLoading).toHaveBeenCalledWith(true)
    expect(mockSetBilling).toHaveBeenCalledWith({})
    expect(mockSetBillingLoading).toHaveBeenLastCalledWith(false)
    expect(mockSetMessageState).not.toHaveBeenCalled()
  })

  it('should show an error message if fetching fails', async () => {
    const mockSetBilling = jest.fn()
    const mockSetBillingLoading = jest.fn()
    const mockSetMessageState = jest.fn()
    const mockOrgId = 'SOME_ID'
    const mockDateFrom = new Date('2020-12-01')
    const mockDateTo = new Date('2020-12-31')
    ;(getBillingByDatesService as jest.Mock).mockReturnValueOnce(undefined)

    const curried = handleGetBillingByPeriod(
      mockSetBilling,
      mockSetBillingLoading,
      mockSetMessageState,
      mockOrgId,
      mockDateFrom,
      mockDateTo,
    )

    await curried()

    expect(mockSetBillingLoading).toHaveBeenCalledWith(true)
    expect(mockSetBilling).not.toHaveBeenCalledWith({})
    expect(mockSetBillingLoading).toHaveBeenLastCalledWith(false)
    expect(mockSetMessageState).toHaveBeenCalledWith({
      errorMessage: 'Something went wrong fetching billing, please try again',
    })
  })
})

describe('handleGetSettings', () => {
  it('should get and set settings if there is a month value', async () => {
    const mockSettings = jest.fn()
    const mockSettingsLoading = jest.fn()
    const mockSession = {} as ReapitConnectSession

    const curried = handleGetSettings(mockSettingsLoading, mockSettings, mockSession)

    await curried()

    expect(mockSettingsLoading).toHaveBeenCalledWith(true)
    expect(mockSettings).toHaveBeenCalledWith({})
    expect(mockSettingsLoading).toHaveBeenLastCalledWith(false)
  })

  it('should set default settings if fetching fails', async () => {
    const mockSettings = jest.fn()
    const mockSettingsLoading = jest.fn()
    const mockSession = {} as ReapitConnectSession
    ;(getSettingsService as jest.Mock).mockReturnValueOnce(undefined)

    const curried = handleGetSettings(mockSettingsLoading, mockSettings, mockSession)

    await curried()

    expect(mockSettingsLoading).toHaveBeenCalledWith(true)
    expect(mockSettings).toHaveBeenCalledWith({ monthlyUsageCap: 0 })
    expect(mockSettingsLoading).toHaveBeenLastCalledWith(false)
  })
})

describe('handleUpdateSettings', () => {
  it('should get and set settings if there is a month value', async () => {
    const mockSetMessageState = jest.fn()
    const mockSettings = jest.fn()
    const mockSettingsLoading = jest.fn()
    const mockHandleClose = jest.fn()
    ;(getSettingsService as jest.Mock).mockReturnValueOnce({})

    const curried = handleUpdateSettings(mockSettingsLoading, mockSettings, mockSetMessageState, mockHandleClose)

    await curried({ monthlyUsageCap: 0 })

    expect(mockSettingsLoading).toHaveBeenCalledWith(true)
    expect(mockSetMessageState).toHaveBeenCalledWith({
      infoMessage: 'Usage cap successfully updated',
    })
    expect(mockSettingsLoading).toHaveBeenLastCalledWith(false)
  })

  it('should set default settings if fetching fails', async () => {
    const mockSetMessageState = jest.fn()
    const mockSettings = jest.fn()
    const mockSettingsLoading = jest.fn()
    const mockHandleClose = jest.fn()
    ;(updateSettingsService as jest.Mock).mockReturnValueOnce(undefined)

    const curried = handleUpdateSettings(mockSettingsLoading, mockSettings, mockSetMessageState, mockHandleClose)

    await curried({ monthlyUsageCap: 0 })

    expect(mockSettingsLoading).toHaveBeenCalledWith(true)
    expect(mockSetMessageState).toHaveBeenCalledWith({
      errorMessage: 'Something went wrong updating usage cap',
    })
    expect(mockSettingsLoading).toHaveBeenLastCalledWith(false)
  })
})
