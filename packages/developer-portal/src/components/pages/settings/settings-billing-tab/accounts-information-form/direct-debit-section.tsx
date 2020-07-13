import * as React from 'react'
import { GridItem, FormHeading, FormSubHeading, Button } from '@reapit/elements'
import { AccountsInformationFormValues, ACCOUNT_REF_MIN_LENGTH } from './accounts-information-form'

export type DirectDebitSectionProps = {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  values: AccountsInformationFormValues
}

const DirectDebitSection: React.FC<DirectDebitSectionProps> = ({ values }) => {
  const { hasReapitAccountsRef, reapitReference } = values

  const isShowDirectDebitWithRef =
    hasReapitAccountsRef === 'yes' && (reapitReference || '').length >= ACCOUNT_REF_MIN_LENGTH
  const isShowDirectDebitWithoutRef = hasReapitAccountsRef === 'no'

  if (isShowDirectDebitWithRef)
    return (
      <GridItem>
        <FormHeading>Direct Debit</FormHeading>
        <FormSubHeading>
          As you are providing a Reapit Reference, we will need to validate your account with our Accounts Department.
          Once confirmed, any subscriptions will be added to your existing monthly Direct Debit. Please now click ‘Save’
          to submit your account information
        </FormSubHeading>
      </GridItem>
    )

  if (isShowDirectDebitWithoutRef)
    return (
      <GridItem>
        <FormHeading>Direct Debit</FormHeading>
        <FormSubHeading>
          You will need to setup a Direct Debit before you can make any subscriptions within the Developers Portal, this
          includes submitting an app for approval and listing an app within the Marketplace. Once completed your account
          will be verified by our Account Department.
        </FormSubHeading>
        <Button>Setup Direct Debit</Button>
      </GridItem>
    )

  return null
}

export default DirectDebitSection
