import React from 'react'
import { render } from '../../../tests/react-testing'
import { SharesTable } from '../shares-table'
import { stubShares } from '../../../tests/__stubs__/shares'

describe('SharesTable', () => {
  it('should match a snapshot', () => {
    expect(render(<SharesTable shares={stubShares._embedded} refreshShares={jest.fn()} />)).toMatchSnapshot()
  })
})
