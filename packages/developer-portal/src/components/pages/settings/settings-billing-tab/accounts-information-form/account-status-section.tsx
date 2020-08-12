import * as React from 'react'
import { GridItem, Input, Content, Helper } from '@reapit/elements'
import formFields from './form-schema/form-fields'
import { statusText } from './__styles__/account-status-section'

const { statusField } = formFields

type AccountStatusSectionProps = {
  initialStatus?: string
  isSubmittedDebit: boolean
  hasReapitAccountsRef: string
}

export const capitalizeFirstLetter: (str: string) => string = str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const AccountStatusSection: React.FC<AccountStatusSectionProps> = ({
  initialStatus,
  isSubmittedDebit,
  hasReapitAccountsRef,
}) => {
  const isPending = initialStatus === 'pending'

  // when get data from server, if status is pending and REAPIT ACCOUNTS REF is no, show general thank message
  const shouldThankInGeneral = isPending && hasReapitAccountsRef === 'no'

  // when user submit debit info in iframe -> show thank for setting up debit message
  const shouldThankSettingDebit = hasReapitAccountsRef === 'no' && isSubmittedDebit

  return (
    <GridItem>
      {shouldThankInGeneral && (
        <Content className="is-italic">
          Thank you for submitting your Account Information and setting up a Direct Debit, we just need to validate your
          information with our Accounts Department. One this has been completed your account will be set to ‘Active’ and
          you can procced with any subscriptions.
        </Content>
      )}
      {shouldThankSettingDebit && (
        <Helper variant="info" closeButton={false}>
          Thank you for setting up a Direct Debit, please now click on ‘Submit to Accounts’ to continue
        </Helper>
      )}
      {/* hidden input to store "initialStatus" field */}
      <Input type="hidden" id={statusField.name} name={statusField.name} />

      <Content className={statusText}>
        {initialStatus === 'pending' && (
          <p className="mb-1">We are currently verifying your information with our Accounts Department</p>
        )}
        <b>ACCOUNT STATUS:</b> <i>{capitalizeFirstLetter(initialStatus || '')}</i>
      </Content>
    </GridItem>
  )
}

export default AccountStatusSection
