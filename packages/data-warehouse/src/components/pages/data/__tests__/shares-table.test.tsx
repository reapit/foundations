import React from 'react'
import { render } from '../../../../tests/react-testing'
import SharesTable from '../shares-table'
import { stubShares } from '../../../../services/__stubs__/shares'

describe('SharesTable', () => {
  it('should match a snapshot', () => {
    expect(render(<SharesTable shares={stubShares._embedded} setShares={jest.fn()} />)).toMatchSnapshot()
  })
})
