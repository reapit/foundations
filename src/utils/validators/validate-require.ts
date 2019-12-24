import { validateBase, ValidateCustomParams } from './validate-base'
import { PartialRecord } from './index'
import errorMessages from './error-messages'

export const validateRequire = <ValuesType, ErrorKeys extends string>({
  values,
  currentErrors,
  keys
}: ValidateCustomParams<ValuesType, ErrorKeys>): PartialRecord<ErrorKeys, string> => {
  return validateBase<ValuesType, ErrorKeys>({
    values,
    keys,
    validator: str => str !== '',
    errMessage: errorMessages.FIELD_REQUIRED,
    currentErrors
  })
}

export const fieldValidateRequire = (value: string) => {
  if (value) {
    return null
  }
  return errorMessages.FIELD_REQUIRED
}
