import * as React from 'react'
import { shallow } from 'enzyme'
import CostExplorer, { prepareFilterFormInitialValues, CostFilterFormValues, handleOnSave } from '../cost-explorer'

describe('CostCalculator', () => {
  const mockCreatedMonth = '2020-04'
  it('should match a snapshot', () => {
    expect(shallow(<CostExplorer />)).toMatchSnapshot()
  })

  describe('prepareInitialValues', () => {
    it('should run correctly', () => {
      const fn = prepareFilterFormInitialValues(mockCreatedMonth)
      const formValues: CostFilterFormValues = fn()
      expect(formValues).toEqual({
        createdMonth: mockCreatedMonth,
      })
    })
  })

  describe('handleOnSave', () => {
    it('should run correctly', () => {
      const mockSetCreatedMonth = jest.fn()
      const mockFormValues: CostFilterFormValues = {
        createdMonth: mockCreatedMonth,
      }
      const fn = handleOnSave(mockSetCreatedMonth)
      fn(mockFormValues)
      expect(mockSetCreatedMonth).toBeCalledWith(mockCreatedMonth)
    })
  })
})
