import React from 'react'
import { useRecoilValue } from 'recoil'
import { H3 } from '@reapit/elements'
import { organisationAccountQuery } from '../../../selectors/accounts'
import ErrorBoundary from '../../hocs/error-boundary'
import AccountsSection from './accounts-section'

export type AccountsProps = {}

export const Accounts: React.FC<AccountsProps> = () => {
  const account = useRecoilValue(organisationAccountQuery)

  console.log('account is', account)

  return (
    <>
      <H3 isHeadingSection>Accounts</H3>
      <ErrorBoundary>
        <AccountsSection />
      </ErrorBoundary>
    </>
  )
}

export default Accounts
