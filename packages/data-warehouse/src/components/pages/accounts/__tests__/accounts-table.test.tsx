import React from 'react'
import { mount } from 'enzyme'
import AccountsTable from '../accounts-table'
import { stubAccounts } from '../../../../services/__stubs__/accounts'

describe('AccountsTable', () => {
  it('should match a snapshot', () => {
    expect(mount(<AccountsTable accounts={stubAccounts._embedded} setAccounts={jest.fn()} />)).toMatchSnapshot()
  })
})
