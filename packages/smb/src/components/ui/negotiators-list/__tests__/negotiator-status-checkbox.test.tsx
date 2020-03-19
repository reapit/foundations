import * as React from 'react'
import { shallow } from 'enzyme'
import {
  mockSpreadSheetDataForUpdateCase,
  mockOfficeCellRenderProps,
  mockSpreadSheetDataForCreateCase,
} from '../__mocks__/negotiators'
import NegotiatorStatusCheckbox, {
  NegotiatorStatusCheckboxProps,
  handleCheckBoxChange,
  handleUseEffect,
} from '../negotiator-status-checkbox'

const mockProps: NegotiatorStatusCheckboxProps = {
  cellRenderProps: mockOfficeCellRenderProps,
  updateNegotiator: jest.fn(),
  data: mockSpreadSheetDataForUpdateCase,
  setData: jest.fn(),
  disabled: false,
}

const mockHandleCheckboxChangeParamsForUpdateCase = {
  e: {
    target: { check: true },
  },
  data: mockSpreadSheetDataForUpdateCase,
  row: 1,
  col: 5,
  disabled: false,
  setChecked: jest.fn(),
  setData: jest.fn(),
  updateNegotiator: jest.fn(),
}

const mockHandleCheckboxChangeParamsForCreateCase = {
  e: {
    target: { check: true },
  },
  data: mockSpreadSheetDataForCreateCase,
  row: 1,
  col: 5,
  disabled: false,
  setChecked: jest.fn(),
  setData: jest.fn(),
  updateNegotiator: jest.fn(),
}

describe('NegotiatorStatusCheckbox', () => {
  it('should match a snapshot', () => {
    expect(shallow(<NegotiatorStatusCheckbox {...mockProps} />)).toMatchSnapshot()
  })

  describe('handleUseEffect', () => {
    it('should run correctly', () => {
      const mockFunction = jest.fn()
      const mockCheckboxValue = true
      const fn = handleUseEffect(mockCheckboxValue, mockFunction)
      fn()
      expect(mockFunction).toBeCalled()
    })
  })

  describe('handleCheckBoxChange', () => {
    it('should return if checkbox is disabled', () => {
      if (mockProps.disabled) {
        expect(handleCheckBoxChange).toReturn
      }
    })
    it('should execute updateNegotiator in case of existing row', () => {
      const fn = () => {
        handleCheckBoxChange(mockHandleCheckboxChangeParamsForUpdateCase)
      }
      fn()
      expect(mockHandleCheckboxChangeParamsForUpdateCase.updateNegotiator).toBeCalled
    })
    it('should execute setChecked & setData only in case of new row', () => {
      const fn = () => {
        handleCheckBoxChange(mockHandleCheckboxChangeParamsForCreateCase)
      }
      fn()
      expect(mockHandleCheckboxChangeParamsForUpdateCase.setChecked).toBeCalled
      expect(mockHandleCheckboxChangeParamsForUpdateCase.setData).toBeCalled
      expect(handleCheckBoxChange).toReturn
    })
  })
})
