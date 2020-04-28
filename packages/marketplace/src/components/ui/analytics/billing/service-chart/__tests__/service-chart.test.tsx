import * as React from 'react'
import { shallow } from 'enzyme'

import { ServiceChart } from '../service-chart'

describe('ServiceChart', () => {
  it('should match a snapshot', () => {
    expect(shallow(<ServiceChart />)).toMatchSnapshot()
  })
})
