import { validateBase, ValidateCustomParams } from './validate-base'
import { PartialRecord } from './index'
import errorMessages from './error-messages'
import { isEmptyString } from './validate-string'

export const validateRequire = <ValuesType, ErrorKeys extends string>({
  values,
  currentErrors,
  keys,
}: ValidateCustomParams<ValuesType, ErrorKeys>): PartialRecord<ErrorKeys, string> => {
  return validateBase<ValuesType, ErrorKeys>({
    values,
    keys,
    validator: str => str !== '',
    errMessage: errorMessages.FIELD_REQUIRED,
    currentErrors,
  })
}

export const fieldValidateRequire = (value: string) => {
  if (isEmptyString(value)) {
    return errorMessages.FIELD_REQUIRED
  }
  return null
}

export const dropdownSelectFieldValidateRequire = (value: string | string[]): string => {
  if (!isEmptyString(value)) {
    return ''
  }
  return errorMessages.FIELD_REQUIRED
}
