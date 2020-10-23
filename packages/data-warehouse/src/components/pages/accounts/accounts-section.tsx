import React from 'react'
import { useRecoilValue } from 'recoil'
import { H5, Section } from '@reapit/elements'
import { organisationAccountQuery } from '../../../selectors/accounts'

export type AccountsSectionProps = {}

export const AccountsSection: React.FC<AccountsSectionProps> = () => {
  const account = useRecoilValue(organisationAccountQuery)

  console.log('account is', account)

  return (
    <Section>
      <H5>Next steps:</H5>
    </Section>
  )
}

export default AccountsSection
