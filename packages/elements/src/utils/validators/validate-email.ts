/* eslint-disable max-len */
import { validateBase, ValidateCustomParams } from './validate-base'
import errorMessages from './error-messages'
import { PartialRecord } from './index'

export const isEmail = email => {
  // RFC 5322 email specfication
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export const validateEmail = <ValueTypes, ErrorKeys extends string>({
  values,
  currentErrors,
  keys,
}: ValidateCustomParams<ValueTypes, ErrorKeys>): PartialRecord<ErrorKeys, string> => {
  return validateBase<ValueTypes, ErrorKeys>({
    values,
    keys,
    validator: isEmail,
    errMessage: errorMessages.FIELD_WRONG_EMAIL_FORMAT,
    currentErrors,
  })
}
