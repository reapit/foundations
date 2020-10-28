import React, { SetStateAction, useContext, useState } from 'react'
import { Button, ErrorData, Table } from '@reapit/elements'
import { disableAccountsService, getAccountsService } from '../../../services/accounts'
import { AccountModel } from '../../../types/accounts'
import { ErrorContext } from '../../../context/error-context'
import { Dispatch } from 'react'
import { serverError } from '../../ui/toast-error'
import { PagedApiResponse } from '../../../types/core'
import AccountUpdateModal from './account-update-modal'

export interface AccountsTableProps {
  accounts: AccountModel[]
  setAccounts: Dispatch<SetStateAction<PagedApiResponse<AccountModel> | undefined>>
}

export interface TableCellProps<T> {
  cell: { value: T }
}

export const disableAccount = (
  setServerErrorState: Dispatch<React.SetStateAction<ErrorData | null>>,
  setAccounts: Dispatch<SetStateAction<PagedApiResponse<AccountModel> | undefined>>,
  value: string,
) => async () => {
  const disabled = await disableAccountsService(value)

  if (!disabled) return setServerErrorState(serverError('Something went wrong disabling account, please try again'))

  const accounts = await getAccountsService()
  if (accounts) {
    return setAccounts(accounts)
  }
  return setServerErrorState(serverError('Something went wrong fetching accounts, please try again'))
}

export const AccountsTable: React.FC<AccountsTableProps> = ({ accounts, setAccounts }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null)
  const handleModalClose = () => {
    setModalVisible(false)
    setSelectedAccountId(null)
  }
  const handleModalOpen = (accountId: string) => () => {
    setModalVisible(true)
    setSelectedAccountId(accountId)
  }

  const DisableButton: React.FC<TableCellProps<string>> = ({ cell: { value } }) => {
    const { setServerErrorState } = useContext(ErrorContext)

    return <Button onClick={disableAccount(setServerErrorState, setAccounts, value)}>Disable</Button>
  }

  const UpdatePasswordButton: React.FC<TableCellProps<string>> = ({ cell: { value } }) => {
    return <Button onClick={handleModalOpen(value)}>Update</Button>
  }

  const columns = [
    {
      Header: 'User Name',
      accessor: 'username',
    },
    {
      Header: 'Update Password',
      accessor: 'id',
      id: `#${Math.random() * 10}`,
      Cell: UpdatePasswordButton,
    },
    {
      Header: 'Disable Account',
      accessor: 'id',
      Cell: DisableButton,
    },
  ]

  return (
    <>
      <AccountUpdateModal visible={modalVisible} handleClose={handleModalClose} accountId={selectedAccountId} />
      <Table columns={columns} data={accounts} />
    </>
  )
}

export default AccountsTable
