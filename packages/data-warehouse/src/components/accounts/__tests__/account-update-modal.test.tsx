import React from 'react'
import { render } from '../../../tests/react-testing'
import { AccountCreateModel } from '../../../types/accounts'
import { AccountUpdateModal, handleUpdateAccount } from '../account-update-modal'

describe('AccountUpdateModal', () => {
  it('should match a snapshot', () => {
    expect(render(<AccountUpdateModal accountId="SOME_ID" closeModal={jest.fn()} />)).toMatchSnapshot()
  })
})

describe('handleUpdateAccount', () => {
  it('should handle updating an account', async () => {
    const updateAccount = jest.fn(() => Promise.resolve(true))
    const refreshAccount = jest.fn()
    const closeModal = jest.fn()
    const account = {
      password: 'MOCK_PASSWORD',
      username: 'MOCK_USERNAME',
      isAdmin: false,
      devMode: false,
    } as AccountCreateModel

    const curried = handleUpdateAccount(updateAccount, refreshAccount, closeModal)

    curried(account)

    await Promise.resolve()

    expect(updateAccount).toHaveBeenCalledWith(account)
    expect(refreshAccount).toHaveBeenCalledTimes(1)
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})
