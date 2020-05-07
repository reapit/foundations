import * as React from 'react'
import { shallow } from 'enzyme'
import CostExplorerTable from '../cost-explorer-table'

describe('CostExplorerTable', () => {
  it('should match a snapshot', () => {
    expect(shallow(<CostExplorerTable />)).toMatchSnapshot()
  })
})
