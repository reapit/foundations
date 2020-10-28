import React from 'react'
import { shallow } from 'enzyme'
import DataSetsTable from '../data-sets-table'
import { stubDataSets } from '../../../../services/__stubs__/data-sets'

describe('DataSetsTable', () => {
  it('should match a snapshot', () => {
    expect(shallow(<DataSetsTable dataSets={stubDataSets._embedded} setShares={jest.fn()} />)).toMatchSnapshot()
  })
})
