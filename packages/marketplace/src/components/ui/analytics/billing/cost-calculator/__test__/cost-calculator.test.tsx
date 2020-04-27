import * as React from 'react'
import { shallow } from 'enzyme'

import CostCalculator, { prepareInitialValues, handleOnSubmit, handleOnClear } from '../cost-calculator'
import { CostCalculatorFormValues } from '../cost-calculator-form'

describe('CostCalculator', () => {
  const mockSetEndpointsUsed = jest.fn()
  const mockSetApiCalls = jest.fn()

  it('should match a snapshot', () => {
    expect(shallow(<CostCalculator />)).toMatchSnapshot()
  })
  describe('prepareInitialValues', () => {
    it('should run correctly', () => {
      const mockEndpointsUsed = 'tier3'
      const mockApiCalls = '1000'
      const fn = prepareInitialValues(mockEndpointsUsed, mockApiCalls)
      const formValues: CostCalculatorFormValues = fn()
      expect(formValues).toEqual({
        endpointsUsed: mockEndpointsUsed,
        apiCalls: mockApiCalls,
      })
    })
  })
  describe('handleOnSubmit', () => {
    it('should run correctly', () => {
      const mockFormValues: CostCalculatorFormValues = {
        endpointsUsed: 'tier1',
        apiCalls: '12000',
      }
      const fn = handleOnSubmit(mockSetEndpointsUsed, mockSetApiCalls)
      fn(mockFormValues)
      expect(mockSetEndpointsUsed).toBeCalledWith(mockFormValues.endpointsUsed)
      expect(mockSetApiCalls).toBeCalledWith(mockFormValues.apiCalls)
    })
  })
  describe('handleOnClear', () => {
    it('should run correctly', () => {
      const fn = handleOnClear(mockSetEndpointsUsed, mockSetApiCalls)
      fn()
      expect(mockSetEndpointsUsed).toBeCalledWith('')
      expect(mockSetApiCalls).toBeCalledWith('')
    })
  })
})
