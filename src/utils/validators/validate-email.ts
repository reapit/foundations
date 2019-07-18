import { validateBase, ValidateCustomParams } from './validate-base'
import errorMessages from '@/constants/error-messages'
import { PartialRecord } from '@/types/core'

export const emailValidator = email => {
  // RFC 5322 email specfication
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

const validateEmail = <ValueTypes, ErrorKeys extends string>({
  values,
  currentErrors,
  keys
}: ValidateCustomParams<ValueTypes, ErrorKeys>): PartialRecord<ErrorKeys, string> => {
  return validateBase<ValueTypes, ErrorKeys>({
    values,
    keys,
    validator: emailValidator,
    errMessage: errorMessages.FIELD_WRONG_EMAIL_FORMAT,
    currentErrors
  })
}

export default validateEmail
