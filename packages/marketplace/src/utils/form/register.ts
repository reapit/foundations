import { isEmail, isValidPersonName, isValidTelephone } from '../validate'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import ErrorMessages from '@/constants/error-messages'

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
    errors.name = ErrorMessages.FIELD_REQUIRED
  } else if (!isValidPersonName(trimmedValues.name)) {
    errors.name = ErrorMessages.FIELD_INVALID_NAME
  }

  if (!trimmedValues.companyName) {
    errors.companyName = ErrorMessages.FIELD_REQUIRED
  }

  if (!trimmedValues.email) {
    errors.email = ErrorMessages.FIELD_REQUIRED
  } else if (!isEmail(trimmedValues.email)) {
    errors.email = ErrorMessages.FIELD_WRONG_EMAIL_FORMAT
  }

  if (!trimmedValues.telephone) {
    errors.telephone = ErrorMessages.FIELD_REQUIRED
  } else if (!isValidTelephone(trimmedValues.telephone)) {
    errors.telephone = ErrorMessages.FIELD_PHONE_NUMER
  }

  return errors
}
