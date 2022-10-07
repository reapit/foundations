import React from 'react'
import { render } from '../../../../tests/react-testing'
import AccountsTable from '../accounts-table'

describe('AccountsTable', () => {
  it('should match a snapshot', () => {
    expect(render(<AccountsTable />)).toMatchSnapshot()
  })
})
