import { validateBase, ValidateCustomParams } from './validate-base'
import errorMessages from './error-messages'
import { PartialRecord } from './index'

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/

export function isValidPassword(password: string) {
  return PASSWORD_PATTERN.test(password)
}

export const validatePassword = <ValueTypes, ErrorKeys extends string>({
  values,
  currentErrors,
  keys
}: ValidateCustomParams<ValueTypes, ErrorKeys>): PartialRecord<ErrorKeys, string> => {
  return validateBase<ValueTypes, ErrorKeys>({
    values,
    keys,
    validator: isValidPassword,
    errMessage: errorMessages.FIELD_INVALID_PASSWORD,
    currentErrors
  })
}
