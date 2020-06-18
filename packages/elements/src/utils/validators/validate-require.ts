import { validateBase, ValidateCustomParams } from './validate-base'
import { PartialRecord } from './index'
import errorMessages from './error-messages'

export const validateRequire = <ValuesType, ErrorKeys extends string>({
  values,
  currentErrors,
  keys,
}: ValidateCustomParams<ValuesType, ErrorKeys>): PartialRecord<ErrorKeys, string> => {
  return validateBase<ValuesType, ErrorKeys>({
    values,
    keys,
    validator: str => {
      if (typeof str === 'string') {
        return str.trim() !== ''
      }
      return str !== ''
    },
    errMessage: errorMessages.FIELD_REQUIRED,
    currentErrors,
  })
}

export const fieldValidateRequire = (value: string) => {
  if (!value) {
    return errorMessages.FIELD_REQUIRED
  }
  return null
}
export function isEmpty(value: string | string[]): boolean {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}
export const dropdownSelectFieldValidateRequire = (value: string | string[]): string => {
  if (!isEmpty(value)) {
    return ''
  }
  return errorMessages.FIELD_REQUIRED
}
