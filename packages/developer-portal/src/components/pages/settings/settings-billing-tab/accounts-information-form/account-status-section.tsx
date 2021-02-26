import * as React from 'react'
import { GridItem, Input, Content } from '@reapit/elements'
import formFields from './form-schema/form-fields'
import { statusText } from './__styles__/account-status-section'
import { cx } from 'linaria'

const { statusField } = formFields

type AccountStatusSectionProps = {
  initialStatus?: string
  hasReapitAccountsRef: string
}

export const capitalizeFirstLetter: (str: string) => string = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const AccountStatusSection: React.FC<AccountStatusSectionProps> = ({ initialStatus, hasReapitAccountsRef }) => {
  const isPending = initialStatus === 'pending'

  // when get data from server, if status is pending and REAPIT ACCOUNTS REF is no, show general thank message
  const shouldThankInGeneral = isPending && hasReapitAccountsRef === 'no'

  return (
    <GridItem className="pl-0">
      {shouldThankInGeneral && (
        <Content className={cx('is-italic', statusText)}>
          Thank you for submitting your Account Information and setting up a Direct Debit, we just need to validate your
          information with our Accounts Department. One this has been completed your account will be set to ‘Active’ and
          you can procced with any subscriptions.
        </Content>
      )}
      {/* hidden input to store "initialStatus" field */}
      <Input type="hidden" id={statusField.name} name={statusField.name} />
      <Content className={statusText}>
        {initialStatus === 'pending' && (
          <div className="pb-1">
            <i>We are currently verifying your information with our Accounts Department</i>
          </div>
        )}
        <b>ACCOUNT STATUS:</b> <i>{capitalizeFirstLetter(initialStatus || '')}</i>
      </Content>
    </GridItem>
  )
}

export default AccountStatusSection
