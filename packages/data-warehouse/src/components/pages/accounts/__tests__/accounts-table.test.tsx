import React from 'react'
import { render } from '../../../../tests/react-testing'
import AccountsTable from '../accounts-table'
import { stubAccounts } from '../../../../services/__stubs__/accounts'

describe('AccountsTable', () => {
  it('should match a snapshot', () => {
    expect(render(<AccountsTable accounts={stubAccounts._embedded} setAccounts={jest.fn()} />)).toMatchSnapshot()
  })
})
