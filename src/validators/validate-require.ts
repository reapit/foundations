import { validateBase, ValidateCustomParams } from './validate-base'
import { PartialRecord } from '../types'
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
