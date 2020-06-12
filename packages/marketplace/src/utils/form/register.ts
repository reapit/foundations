import { isEmail, isValidPersonName, isValidTelephone } from '../validate'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'

export type RegisterFormError = Partial<CreateDeveloperModel>

export const trimValues: (values: CreateDeveloperModel) => CreateDeveloperModel = values => {
  const trimmedValues = Object.keys(values).reduce((processTrimmedValues, key) => {
    const trimmedValue = values[key].trim()
    processTrimmedValues[key] = trimmedValue
    return processTrimmedValues
  }, {})

  return trimmedValues
}

export function registerValidate(values: CreateDeveloperModel) {
  let errors = {} as RegisterFormError
  const trimmedValues = trimValues(values)

  if (!trimmedValues.name) {
    errors.name = 'Required'
  } else if (!isValidPersonName(trimmedValues.name)) {
    errors.name = 'Invalid full name'
  }

  if (!trimmedValues.companyName) {
    errors.companyName = 'Required'
  }

  if (!trimmedValues.email) {
    errors.email = 'Required'
  } else if (!isEmail(trimmedValues.email)) {
    errors.email = 'Invalid email address'
  }

  if (!trimmedValues.telephone) {
    errors.telephone = 'Required'
  } else if (!isValidTelephone(trimmedValues.telephone)) {
    errors.telephone = 'Invalid telephone number'
  }

  return errors
}
