import React from 'react'
import { mount } from 'enzyme'
import SharesTable from '../shares-table'
import { stubShares } from '../../../../services/__stubs__/shares'

describe('SharesTable', () => {
  it('should match a snapshot', () => {
    expect(mount(<SharesTable shares={stubShares._embedded} setShares={jest.fn()} />)).toMatchSnapshot()
  })
})
