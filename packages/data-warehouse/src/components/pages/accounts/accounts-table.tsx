import React, { SetStateAction, useContext } from 'react'
import { Button, ErrorData, Table } from '@reapit/elements'
import { disableAccountsService, getAccountsService } from '../../../services/accounts'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { AccountModel } from '../../../types/accounts'
import { ErrorContext } from '../../../context/error-context'
import { Dispatch } from 'react'
import { serverError } from '../../ui/toast-error'
import { PagedApiResponse } from '../../../types/core'

export interface AccountsTableProps {
  accounts: AccountModel[]
  setAccounts: Dispatch<SetStateAction<PagedApiResponse<AccountModel> | undefined>>
}

export interface TableCellProps<T> {
  cell: { value: T }
}

export const AccountsTable: React.FC<AccountsTableProps> = ({ accounts, setAccounts }) => {
  const disableAccount = (
    setServerErrorState: Dispatch<React.SetStateAction<ErrorData | null>>,
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

  const DisableButton: React.FC<TableCellProps<string>> = ({ cell: { value } }) => {
    const { setServerErrorState } = useContext(ErrorContext)

    return <Button onClick={disableAccount(setServerErrorState, value)}>Disable</Button>
  }

  const IsAdminCell: React.FC<TableCellProps<boolean>> = ({ cell: { value } }) => {
    return value ? <FaCheck /> : <FaTimes />
  }

  const columns = [
    {
      Header: 'User Name',
      accessor: 'username',
    },
    {
      Header: 'Admin User',
      accessor: 'isAdmin',
      Cell: IsAdminCell,
    },
    {
      Header: 'Disable Account',
      accessor: 'id',
      Cell: DisableButton,
    },
  ]

  return <Table columns={columns} data={accounts} />
}

export default AccountsTable
