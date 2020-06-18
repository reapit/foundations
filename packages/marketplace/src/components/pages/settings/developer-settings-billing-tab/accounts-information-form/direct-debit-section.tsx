import * as React from 'react'
import { GridItem, FormHeading, FormSubHeading, RadioSelect, Button } from '@reapit/elements'
import { AccountsInformationFormValues } from './accounts-information-form'
import formFields from './form-schema/form-fields'

export type DirectDebitSectionProps = {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  values: AccountsInformationFormValues
}

const hasDirectDebitRadioOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: 'Other (Pay by cheque/bacs/credit)', value: 'other' },
]

const { hasDirectDebitField } = formFields

const DirectDebitSection: React.FC<DirectDebitSectionProps> = ({ setFieldValue, values }) => {
  const { hasDirectDebit } = values
  const isDirectDebitSectionVisible = hasDirectDebit === 'no'

  return (
    <>
      <GridItem>
        <FormHeading>{hasDirectDebitField.heading}</FormHeading>
        <FormSubHeading>{hasDirectDebitField.subHeading}</FormSubHeading>
        <RadioSelect
          isHorizontal
          setFieldValue={setFieldValue}
          state={hasDirectDebit}
          options={hasDirectDebitRadioOptions}
          name={hasDirectDebitField.name}
          id={hasDirectDebitField.name}
        />
      </GridItem>
      {isDirectDebitSectionVisible && (
        <GridItem>
          <FormHeading>Direct Debit</FormHeading>
          <FormSubHeading>
            Before you can make any of your applications available in the Marketplace, you will first need to complete
            and sign a Direct Debit.
          </FormSubHeading>
          <Button>Setup Direct Debit</Button>
        </GridItem>
      )}
    </>
  )
}

export default DirectDebitSection
