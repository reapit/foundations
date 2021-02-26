import React, { SetStateAction, useContext, useState } from 'react'
import { Button, Table } from '@reapit/elements'
import { AccountModel } from '../../../types/accounts'
import { MessageContext } from '../../../context/message-context'
import { Dispatch } from 'react'
import { PagedApiResponse } from '../../../types/core'
import AccountUpdateModal from './account-update-modal'
import { disableAccount } from './account-handlers'

export interface AccountsTableProps {
  accounts: AccountModel[]
  setAccounts: Dispatch<SetStateAction<PagedApiResponse<AccountModel> | undefined>>
}

export interface TableCellProps<T> {
  cell: { value: T }
  data: AccountModel[]
}

export const AccountsTable: React.FC<AccountsTableProps> = ({ accounts, setAccounts }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [disabling, setDisabling] = useState<string>('')
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null)
  const handleModalClose = () => {
    setModalVisible(false)
    setSelectedAccountId(null)
  }
  const handleModalOpen = (accountId: string) => () => {
    setModalVisible(true)
    setSelectedAccountId(accountId)
  }

  const DeleteButton: React.FC<TableCellProps<string>> = ({ cell, data }) => {
    const { setMessageState } = useContext(MessageContext)
    const { value } = cell
    const account = data.find((account) => account.id === value)
    const isDisabling = Boolean(disabling && disabling === value)
    const isDisabled = Boolean(account && account.status !== 'User is active')

    return (
      <Button
        variant="danger"
        onClick={disableAccount(setMessageState, setAccounts, setDisabling, value)}
        disabled={isDisabled || isDisabling}
        loading={isDisabling}
      >
        Deactivate
      </Button>
    )
  }

  const UpdatePasswordButton: React.FC<TableCellProps<string>> = ({ cell, data }) => {
    const { value } = cell
    const account = data.find((account) => account.id === value)
    const isDisabled = Boolean(account && account.status !== 'User is active')
    return (
      <Button onClick={handleModalOpen(value)} disabled={isDisabled}>
        Update
      </Button>
    )
  }

  const columns = [
    {
      Header: 'User Name',
      accessor: 'username',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Update Password',
      accessor: 'id',
      id: 'created',
      Cell: UpdatePasswordButton,
    },
    {
      Header: 'Deactivate User Account',
      accessor: 'id',
      Cell: DeleteButton,
    },
  ]

  return (
    <>
      <AccountUpdateModal visible={modalVisible} handleClose={handleModalClose} accountId={selectedAccountId} />
      <Table columns={columns} data={accounts} scrollable />
    </>
  )
}

export default AccountsTable
