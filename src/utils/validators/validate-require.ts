import { validateBase, ValidateCustomParams } from './validate-base'
import errorMessages from '@/constants/error-messages'
import { PartialRecord } from '@/types/core'

const validateRequire = <ValuesType, ErrorKeys extends string>({
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

export default validateRequire
