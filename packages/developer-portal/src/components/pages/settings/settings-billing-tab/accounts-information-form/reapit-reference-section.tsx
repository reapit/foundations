import * as React from 'react'
import { FormHeading, FormSubHeading, RadioSelect, Input } from '@reapit/elements'
import { AccountsInformationFormValues } from './accounts-information-form'
import formFields from './form-schema/form-fields'

export type ReapitReferenceSectionProps = {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  values: AccountsInformationFormValues
  disabled?: Boolean
}

const { hasReapitAccountsRefField, reapitReferenceField } = formFields

const hasReapitAccountsRefRadioOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]

const ReapitReferenceSection: React.FC<ReapitReferenceSectionProps> = ({ setFieldValue, values, disabled }) => {
  const { hasReapitAccountsRef } = values

  const isStatusNotInComplete = values?.status !== 'incomplete'
  const hasReapitAccountsRefFieldDisabled = hasReapitAccountsRef === 'no' || isStatusNotInComplete

  return (
    <>
      <FormHeading>{hasReapitAccountsRefField.heading}</FormHeading>
      <FormSubHeading>{hasReapitAccountsRefField.subHeading}</FormSubHeading>
      <RadioSelect
        isHorizontal
        labelText={hasReapitAccountsRefField.label}
        setFieldValue={setFieldValue}
        state={hasReapitAccountsRef}
        options={hasReapitAccountsRefRadioOptions}
        name={hasReapitAccountsRefField.name}
        id={hasReapitAccountsRefField.name}
        disabled={isStatusNotInComplete || Boolean(disabled)}
      />
      <Input
        dataTest="reapitAccountsRef"
        type="text"
        id={reapitReferenceField.name}
        name={reapitReferenceField.name}
        placeholder={reapitReferenceField.placeHolder}
        disabled={hasReapitAccountsRefFieldDisabled || Boolean(disabled)}
      />
    </>
  )
}

export default ReapitReferenceSection
