import React from 'react'
import { mount } from 'enzyme'
import DataSetsTable from '../data-sets-table'
import { stubDataSets } from '../../../../services/__stubs__/data-sets'

describe('DataSetsTable', () => {
  it('should match a snapshot', () => {
    expect(
      mount(<DataSetsTable dataSets={stubDataSets._embedded} setShares={jest.fn()} hasAccount />),
    ).toMatchSnapshot()
  })
})
