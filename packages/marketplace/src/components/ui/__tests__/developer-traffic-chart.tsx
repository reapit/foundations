import * as React from 'react'
import { shallow } from 'enzyme'
import DeveloperTrafficChart, { DeveloperTrafficChartProps } from '../developer-traffic-chart'

const props: DeveloperTrafficChartProps = {}

describe('DeveloperTrafficChart', () => {
  it('should match a snapshot', () => {
    expect(shallow(<DeveloperTrafficChart {...props} />)).toMatchSnapshot()
  })
})
