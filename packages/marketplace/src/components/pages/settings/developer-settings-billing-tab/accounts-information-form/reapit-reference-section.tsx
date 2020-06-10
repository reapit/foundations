import * as React from 'react'
import { GridItem, FormHeading, FormSubHeading, RadioSelect, Input } from '@reapit/elements'
import { AccountsInformationFormValues } from './accounts-information-form'

export type ReapitReferenceSectionProps = {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  values: AccountsInformationFormValues
}

const hasReapitAccountsRefRadioOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]

const ReapitReferenceSection: React.FC<ReapitReferenceSectionProps> = ({ setFieldValue, values }) => {
  const { hasReapitAccountsRef } = values
  const hasReapitAccountsRefFieldDisabled = hasReapitAccountsRef === 'no'
  return (
    <GridItem>
      <FormHeading>Reapit Reference</FormHeading>
      <FormSubHeading>
        If you have an existing account with Reapit you will be able to find your Reapit reference on previous
        correspondence
      </FormSubHeading>
      <RadioSelect
        isHorizontal
        labelText="Do you have a Reapit Accounts Ref?"
        setFieldValue={setFieldValue}
        state={hasReapitAccountsRef}
        options={hasReapitAccountsRefRadioOptions}
        name="hasReapitAccountsRef"
        id="hasReapitAccountsRef"
      />
      <Input
        dataTest="reapitAccountsRef"
        type="text"
        id="reapitAccountsRef"
        name="reapitAccountsRef"
        placeholder="Please enter reference"
        disabled={hasReapitAccountsRefFieldDisabled}
      />
    </GridItem>
  )
}

export default ReapitReferenceSection
