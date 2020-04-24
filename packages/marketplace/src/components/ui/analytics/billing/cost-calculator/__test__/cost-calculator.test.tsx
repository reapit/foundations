import * as React from 'react'
import { shallow } from 'enzyme'

import CostCalculator from '../cost-calculator'

describe('CostCalculator', () => {
  it('should match a snapshot', () => {
    expect(shallow(<CostCalculator />)).toMatchSnapshot()
  })
})
