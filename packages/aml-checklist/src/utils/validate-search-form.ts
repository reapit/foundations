import { cleanObject } from '@reapit/utils'
import { isTextAndNumberOnly } from '@reapit/elements'

export type SearchFormValues = {
  name?: string
  address?: string
  identityCheck?: string
}
export type SearchFormErrorKeys = keyof SearchFormValues

export type SearchFormErrorReturn = Partial<Record<SearchFormErrorKeys, string>>

export const validate = (values: SearchFormValues): SearchFormErrorReturn => {
  const errors: SearchFormErrorReturn = {}
  const formattedValues: SearchFormValues = cleanObject(values)

  const hasAtLeastOneField = ['name', 'address', 'identityCheck'].some(key => formattedValues[key])
  // after strip out all falsy values, check if all values are valid
  const areAllFieldsValid = Object.keys(formattedValues).every(key => isTextAndNumberOnly(formattedValues[key]))

  // allow search & clear errors if have at least one field filled in & all valid
  if (hasAtLeastOneField && areAllFieldsValid) {
    return errors
  }

  const { name, address } = formattedValues

  if (!isTextAndNumberOnly(name)) {
    errors.name = 'Please enter a valid name'
  }

  if (!isTextAndNumberOnly(address)) {
    errors.address = 'Please enter a valid address'
  }

  return errors
}
