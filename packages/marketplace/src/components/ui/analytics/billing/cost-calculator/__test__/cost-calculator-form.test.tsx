import * as React from 'react'
import { shallow } from 'enzyme'

import CostCalculatorForm, {
  CostCalculatorFormProps,
  renderEndpointsUsedOptions,
  validate,
} from '../cost-calculator-form'
import { endpointsUsedRange } from '../cost-calculator'

const mockProps: CostCalculatorFormProps = {
  endpointsUsedRange: endpointsUsedRange,
  initialValues: {
    apiCalls: '',
    endpointsUsed: '',
  },
  onSubmit: () => jest.fn(),
  onClear: () => jest.fn(),
}

describe('CostCalculator', () => {
  it('should match a snapshot', () => {
    expect(shallow(<CostCalculatorForm {...mockProps} />)).toMatchSnapshot()
  })
  describe('renderEndpointsUsedOptions', () => {
    it('should run correctly', () => {
      const result = renderEndpointsUsedOptions(mockProps.endpointsUsedRange)
      expect(result).toEqual([
        {
          value: '',
          label: 'Please select',
        },
        {
          value: 'tier1',
          label: '1-5',
        },
        {
          value: 'tier2',
          label: '6-10',
        },
        {
          value: 'tier3',
          label: '11-20',
        },
        {
          value: 'tier4',
          label: '21-30',
        },
        {
          value: 'tier5',
          label: '31-40',
        },
        {
          value: 'tier6',
          label: '41-50',
        },
        {
          value: 'tier7',
          label: '50+',
        },
      ])
    })
  })
  describe('validate', () => {
    it('should run correctly when all fields are valid', () => {
      const mockFormValues = {
        endpointsUsed: 'tier1',
        apiCalls: '12000',
      }
      const result = validate(mockFormValues)
      expect(result).toEqual({})
    })
    it('should run correctly when endpointsUsed is empty', () => {
      const mockFormValues = {
        endpointsUsed: '',
        apiCalls: '12000',
      }
      const result = validate(mockFormValues)
      expect(result).toEqual({
        endpointsUsed: 'Endpoints Used is required',
      })
    })
    it('should run correctly when apiCalls is empty', () => {
      const mockFormValues = {
        endpointsUsed: 'tier1',
        apiCalls: '',
      }
      const result = validate(mockFormValues)
      expect(result).toEqual({
        apiCalls: 'Invalid Monthly API calls',
      })
    })
    it('should run correctly when apiCalls is not a number', () => {
      const mockFormValues = {
        endpointsUsed: 'tier1',
        apiCalls: '21000d',
      }
      const result = validate(mockFormValues)
      expect(result).toEqual({
        apiCalls: 'Invalid Monthly API calls',
      })
    })
  })
})
