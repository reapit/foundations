import * as React from 'react'
import { shallow } from 'enzyme'

import { CostExplorerTab } from '../cost-explorer'

describe('CostExplorerTab', () => {
  it('should match a snapshot', () => {
    expect(shallow(<CostExplorerTab />)).toMatchSnapshot()
  })
})
