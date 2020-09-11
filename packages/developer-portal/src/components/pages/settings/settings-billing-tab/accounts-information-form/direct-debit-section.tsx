import * as React from 'react'
import { FormHeading, FormSubHeading, Input, Helper } from '@reapit/elements'
import { AccountsInformationFormValues, ACCOUNT_REF_MIN_LENGTH } from './accounts-information-form'
import formFields from './form-schema/form-fields'

const { hasDirectDebitField } = formFields

export type DirectDebitSectionProps = {
  values: AccountsInformationFormValues
  initialStatus?: string
}

const DirectDebitSection: React.FC<DirectDebitSectionProps> = ({ values, initialStatus }) => {
  const { hasReapitAccountsRef, reapitReference } = values

  const isInitialStatusIncomplete = initialStatus === 'incomplete'

  const isInitialStatusInvalid = !isInitialStatusIncomplete
  // https://github.com/reapit/foundations/issues/1987
  // hide the direct debit section when status is not pending and incomplete
  const shouldHideDebitSection = isInitialStatusInvalid

  const isShowDirectDebitWithRef =
    hasReapitAccountsRef === 'yes' && (reapitReference || '').length >= ACCOUNT_REF_MIN_LENGTH

  const isShowDirectDebitWithoutRef = hasReapitAccountsRef === 'no'

  if (shouldHideDebitSection) {
    return null
  }

  if (isShowDirectDebitWithRef)
    return (
      <div>
        <FormHeading>Direct Debit</FormHeading>
        <FormSubHeading>
          As you are providing a Reapit Reference, we will need to validate your account with our Accounts Department.
          Once confirmed, any subscriptions will be added to your existing monthly Direct Debit.
        </FormSubHeading>
        <Helper variant="info" closeButton={false}>
          Please now click ‘Submit to Accounts’ to continue
        </Helper>
      </div>
    )

  if (isShowDirectDebitWithoutRef)
    return (
      <>
        <FormHeading>Direct Debit</FormHeading>
        <FormSubHeading>
          You will need to setup a Direct Debit before you can make any subscriptions within the Developers Portal, this
          includes submitting an app for approval and listing an app within the Marketplace. Once completed your account
          will be verified by our Account Department.
        </FormSubHeading>
        <Input id={hasDirectDebitField.name} type="hidden" name={hasDirectDebitField.name} />
      </>
    )

  return null
}

export default DirectDebitSection
