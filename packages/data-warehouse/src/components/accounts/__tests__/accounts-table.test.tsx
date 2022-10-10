import React from 'react'
import { render } from '../../../tests/react-testing'
import AccountsTable, { handleDeleteAccount, handleModalOpen } from '../accounts-table'

describe('AccountsTable', () => {
  it('should match a snapshot', () => {
    expect(render(<AccountsTable />)).toMatchSnapshot()
  })
})

describe('handleModalOpen', () => {
  it('should handle opening a modal', () => {
    const accountId = 'MOCK_ID'
    const setSelectedAccountId = jest.fn()
    const openModal = jest.fn()
    const curried = handleModalOpen(accountId, setSelectedAccountId, openModal)

    curried()

    expect(setSelectedAccountId).toHaveBeenCalledWith(accountId)
    expect(openModal).toHaveBeenCalledTimes(1)
  })
})

describe('handleDeleteAccount', () => {
  it('should handle deleting an account', async () => {
    const accountId = 'MOCK_ID'
    const deleteAccount = jest.fn(() => Promise.resolve(true))
    const refreshAccounts = jest.fn()
    const curried = handleDeleteAccount(accountId, deleteAccount, refreshAccounts)

    curried()

    await Promise.resolve()

    expect(deleteAccount).toHaveBeenCalledWith(undefined, { uriParams: { accountId } })
    expect(refreshAccounts).toHaveBeenCalledTimes(1)
  })
})
