import * as React from 'react'
import { shallow } from 'enzyme'

import CostCalculatorForm, { CostCalculatorFormProps, renderEndpointsUsedOptions } from '../cost-calculator-form'
import { endpointsUsedRange } from '../use-foundation-cost-table'

const mockProps: CostCalculatorFormProps = {
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
      const result = renderEndpointsUsedOptions(endpointsUsedRange)
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
})
