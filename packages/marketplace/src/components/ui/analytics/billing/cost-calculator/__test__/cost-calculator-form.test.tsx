import * as React from 'react'
import { shallow } from 'enzyme'

import CostCalculatorForm, { CostCalculatorFormProps } from '../cost-calculator-form'
import { endpointsUsedRange } from '../cost-calculator'

const mockProps: CostCalculatorFormProps = {
  endpointsUsedRange: endpointsUsedRange,
  initialValues: {
    apiCalls: '',
    endpointsUsed: '',
  },
  onSubmit: () => {},
}

describe('CostCalculator', () => {
  it('should match a snapshot', () => {
    expect(shallow(<CostCalculatorForm {...mockProps} />)).toMatchSnapshot()
  })
})
