import { cleanObject } from '@reapit/utils'
import { isTextAndNumberOnly } from '@reapit/elements'

export type SearchFormValues = {
  name?: string
  address?: string
  identityCheck?: string
}
export type SearchFormErrorKeys = keyof SearchFormValues

export type SearchFormErrorReturn = Partial<Record<SearchFormErrorKeys, string>>

export const MAX_LENGTH = {
  name: 256,
  address: 256,
}

export const validate = (values: SearchFormValues): SearchFormErrorReturn => {
  const errors: SearchFormErrorReturn = {}
  const formattedValues: SearchFormValues = cleanObject(values)
  const keyToValidate = ['name', 'address']

  // When users enter at least one field, and all entered values are valid
  const hasAtLeastOneField = keyToValidate.some(key => formattedValues[key])
  // after strip out all falsy values, check if all values are valid
  const areAllRemainingFieldsValid = Object.keys(formattedValues).every(key => {
    if (!keyToValidate.includes(key)) {
      return true
    }
    const currentValue = formattedValues[key]
    const currentMaxLength = MAX_LENGTH[key]
    return isTextAndNumberOnly(currentValue) && currentValue.length <= currentMaxLength
  })

  // allow search if have at least one field filled in & all valid
  if (hasAtLeastOneField && areAllRemainingFieldsValid) {
    return errors
  }

  // When users enter invalid values, or not enter anything
  // Loop through to check which fields are invalid
  keyToValidate.forEach(key => {
    const currentValue = formattedValues[key]

    if (!isTextAndNumberOnly(currentValue)) {
      errors[key] = `Please enter a valid ${key}`
      return
    }

    const isTooLong = currentValue.length > MAX_LENGTH[key]

    if (isTooLong) {
      errors[key] = `${key} must be less than ${MAX_LENGTH[key]} characters`
    }
  })

  return errors
}
