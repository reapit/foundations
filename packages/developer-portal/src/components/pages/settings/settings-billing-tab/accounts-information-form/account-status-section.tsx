import * as React from 'react'
import { GridItem, Input, Content } from '@reapit/elements'
import formFields from './form-schema/form-fields'

const { statusField } = formFields

type AccountStatusSectionProps = {
  isPending: boolean
  status: string
  hasReapitAccountsRef: string
}

const AccountStatusSection: React.FC<AccountStatusSectionProps> = ({ isPending, status, hasReapitAccountsRef }) => {
  if (!isPending || hasReapitAccountsRef === 'yes') {
    return null
  }
  return (
    <GridItem>
      <Content className="is-italic">
        Thank you for submitting your Account Information and setting up a Direct Debit, we just need to validate your
        information with our Accounts Department. One this has been completed your account will be set to ‘Active’ and
        you can procced with any subscriptions.
      </Content>
      {/* hidden input to store "status" field */}
      <Input type="hidden" id={statusField.name} name={statusField.name} />
      <Content>
        <b>ACCOUNT STATUS:</b> <i>{status}</i>
      </Content>
    </GridItem>
  )
}

export default AccountStatusSection
