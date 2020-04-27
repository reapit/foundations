import * as React from 'react'
import { shallow } from 'enzyme'
import { endpointsUsedRange, foundationPricing } from '../cost-calculator'
import TotalCostTable, {
  TotalCostTableProps,
  TotalCostTableData,
  prepareData,
  renderEndpointsUsed,
  renderApiCalls,
  renderBand,
  renderCostPerBand,
  renderBandCostPerCall,
} from '../total-cost-table'

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
  bands: [1000, 1500, 2500, 5000, 15000, 25000, 50000],
  bandCostPerCall: [0.0145, 0.0116, 0.0087, 0.00725, 0.0058, 0.003625, 0.00145],
  costPerBand: [14.5, 17.4, 21.75, 36.25, 87, 90.625, 72.5],
  totalMonthlyCost: 340.025,
}

describe('CostCalculator', () => {
  it('should match a snapshot', () => {
    expect(shallow(<TotalCostTable {...mockProps} />)).toMatchSnapshot()
  })
  describe('prepareData', () => {
    it('should run correctly', () => {
      const result: TotalCostTableData = prepareData(mockEndpointsUsed, mockApiCalls, foundationPricing)
      expect(result).toEqual(mockTotalCostTableData)
    })
  })
  describe('renderEndpointsUsed', () => {
    it('should run correctly', () => {
      const result = renderEndpointsUsed(mockTotalCostTableData.bands, endpointsUsedRange, mockEndpointsUsed)
      const wrapper = shallow(<tr>{result}</tr>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderApiCalls', () => {
    it('should run correctly', () => {
      const result = renderApiCalls(mockTotalCostTableData.bands, mockApiCalls)
      const wrapper = shallow(<tr>{result}</tr>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderBand', () => {
    it('should run correctly', () => {
      const result = renderBand(mockTotalCostTableData.bands)
      const wrapper = shallow(<tr>{result}</tr>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderCostPerBand', () => {
    it('should run correctly', () => {
      const result = renderCostPerBand(mockTotalCostTableData.costPerBand)
      const wrapper = shallow(<tr>{result}</tr>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderBandCostPerCall', () => {
    it('should run correctly', () => {
      const result = renderBandCostPerCall(mockTotalCostTableData.bandCostPerCall)
      const wrapper = shallow(<tr>{result}</tr>)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
