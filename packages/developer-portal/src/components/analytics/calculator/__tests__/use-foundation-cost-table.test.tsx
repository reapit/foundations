import { prepareData, TotalCostTableData } from '../use-foundation-cost-table'

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

describe('prepareData', () => {
  it('should correctly prepare data', () => {
    const curried = prepareData(mockEndpointsUsed, mockApiCalls)
    const result: TotalCostTableData = curried()
    expect(result).toEqual(mockTotalCostTableData)
  })
})
