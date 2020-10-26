import React, { useState, useEffect, useContext } from 'react'
import { H3, H5, Section } from '@reapit/elements'
import { getAccountsService } from '../../../services/accounts'
import { PagedApiResponse } from '../../../types/core'
import { AccountModel } from '../../../types/accounts'
import AccountsTable from './accounts-table'
import { serverError } from '../../ui/toast-error'
import { ErrorContext } from '../../../context/error-context'

export const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<PagedApiResponse<AccountModel>>()
  const { setServerErrorState } = useContext(ErrorContext)

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await getAccountsService()
      if (accounts) {
        return setAccounts(accounts)
      }
      return setServerErrorState(serverError('Something went wrong fetching accounts, please try again'))
    }
    getAccounts()
  }, [setAccounts])

  return (
    <>
      <H3 isHeadingSection>Accounts</H3>
      {Boolean(accounts?._embedded.length) && (
        <Section>
          <H5>Account Details</H5>
          <AccountsTable accounts={accounts?._embedded ?? []} setAccounts={setAccounts} />
        </Section>
      )}
    </>
  )
}

export default Accounts
