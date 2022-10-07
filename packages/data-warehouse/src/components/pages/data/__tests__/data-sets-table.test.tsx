import React from 'react'
import { render } from '../../../../tests/react-testing'
import DataSetsTable from '../data-sets-table'
import { stubDataSets } from '../../../../services/__stubs__/data-sets'

describe('DataSetsTable', () => {
  it('should match a snapshot', () => {
    expect(render(<DataSetsTable dataSets={stubDataSets._embedded} refreshShares={jest.fn()} />)).toMatchSnapshot()
  })
})
