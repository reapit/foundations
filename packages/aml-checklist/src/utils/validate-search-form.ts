import { cleanObject } from '@reapit/utils'

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
  const { name, address } = formattedValues

  const isHaveAtLeastOneField = ['name', 'address', 'identityCheck'].some(key => formattedValues[key])

  // allow search & clear errors if have at least one field filled in
  if (isHaveAtLeastOneField) {
    return errors
  }

  if (!name) {
    errors.name = 'Please enter a valid name'
  }

  if (!address) {
    errors.address = 'Please enter a valid address'
  }

  return errors
}
