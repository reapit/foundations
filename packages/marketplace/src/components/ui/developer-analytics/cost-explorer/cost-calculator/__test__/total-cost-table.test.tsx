import * as React from 'react'
import { shallow } from 'enzyme'
import { endpointsUsedRange, foundationPricing } from '../cost-calculator'
import TotalCostTable, {
  TotalCostTableProps,
  TotalCostTableData,
  prepareData,
  prepareTableColumns,
  toggleShowTable,
} from '../total-cost-table'
import { formatNumber, formatCurrency } from '@/utils/number-formatter'

const mockProps: TotalCostTableProps = {
  endpointsUsedRange: endpointsUsedRange,
  formValues: {
    apiCalls: '',
    endpointsUsed: '',
  },
  foundationPricing,
}
const mockEndpointsUsed = 'tier4'
const mockApiCalls = '100000'
const mockTotalCostTableData = {
  tableData: [
    {
      numberOfApiCalls: 1000,
      costPerApiCall: 0.0145,
      totalCost: 14.5,
    },
    {
      numberOfApiCalls: 1500,
      costPerApiCall: 0.0116,
      totalCost: 17.4,
    },
    {
      numberOfApiCalls: 2500,
      costPerApiCall: 0.0087,
      totalCost: 21.75,
    },
    {
      numberOfApiCalls: 5000,
      costPerApiCall: 0.00725,
      totalCost: 36.25,
    },
    {
      numberOfApiCalls: 15000,
      costPerApiCall: 0.0058,
      totalCost: 87,
    },
    {
      numberOfApiCalls: 25000,
      costPerApiCall: 0.003625,
      totalCost: 90.625,
    },
    {
      numberOfApiCalls: 50000,
      costPerApiCall: 0.00145,
      totalCost: 72.5,
    },
  ],
  totalMonthlyCost: 340.025,
}

describe('CostCalculator', () => {
  it('should match a snapshot', () => {
    expect(shallow(<TotalCostTable {...mockProps} />)).toMatchSnapshot()
  })
  describe('prepareData', () => {
    it('should run correctly', () => {
      const fn = prepareData(mockEndpointsUsed, mockApiCalls, foundationPricing)
      const result: TotalCostTableData = fn()
      expect(result).toEqual(mockTotalCostTableData)
    })
  })
  describe('prepareTableColumns', () => {
    const fn = prepareTableColumns(mockTotalCostTableData.totalMonthlyCost)
    const columns = fn()
    it('should return 3 columns in total', () => {
      expect(columns).toHaveLength(3)
    })
    it('should return valid Header, accessor and Footer for each column', () => {
      mockTotalCostTableData.tableData.forEach(row => {
        columns.forEach(({ Header, accessor, Footer }, index) => {
          if (index === 0) {
            expect(Header).toEqual('Number of API Calls')
            if (typeof accessor === 'function') {
              const numberOfApiCalls = accessor(row)
              expect(numberOfApiCalls).toEqual(formatNumber(row.numberOfApiCalls))
            }
          }
          if (index === 1) {
            expect(Header).toEqual('Cost Per API Call')
            if (typeof accessor === 'function') {
              const costPerApiCall = accessor(row)
              expect(costPerApiCall).toBe(formatCurrency(row.costPerApiCall, 6))
            }
            expect(Footer).toEqual('Estimated total monthly cost')
          }
          if (index === 2) {
            expect(Header).toEqual('Total Cost')
            if (typeof accessor === 'function') {
              const totalCost = accessor(row)
              expect(totalCost).toEqual(formatCurrency(row.totalCost))
            }
            if (typeof Footer === 'function') {
              const totalMonthlyCost = Footer()
              expect(totalMonthlyCost).toBe(formatCurrency(mockTotalCostTableData.totalMonthlyCost))
            }
          }
        })
      })
    })
  })
  describe('toggleShowTable', () => {
    it('should run correctly', () => {
      const mockIsTableExpanded = false
      const mockSetIsTableExpanded = jest.fn()
      const fn = toggleShowTable(mockIsTableExpanded, mockSetIsTableExpanded)
      fn()
      expect(mockSetIsTableExpanded).toBeCalledWith(!mockIsTableExpanded)
    })
  })
})
