import { validateBase, ValidateCustomParams } from './validate-base'
import { PartialRecord } from './index'

export const minLengthValidator = (length: number) => (str: string) => {
  return !!str && str.length >= length
}

export const maxLengthValidator = (length: number) => (str: string) => {
  return !!str && str.length <= length
}

export const validateMinCharacterLength = <ValueTypes, ErrorKeys extends string>({
  values,
  currentErrors,
  keys,
  length
}: ValidateCustomParams<ValueTypes, ErrorKeys> & { length: number }): PartialRecord<ErrorKeys, string> => {
  return validateBase<ValueTypes, ErrorKeys>({
    values,
    keys,
    validator: minLengthValidator(length),
    errMessage: `The minimum length is ${length} characters`,
    currentErrors
  })
}

export const validateMaxCharacterLength = <ValueTypes, ErrorKeys extends string>({
  values,
  currentErrors,
  keys,
  length
}: ValidateCustomParams<ValueTypes, ErrorKeys> & { length: number }): PartialRecord<ErrorKeys, string> => {
  return validateBase<ValueTypes, ErrorKeys>({
    values,
    keys,
    validator: maxLengthValidator(length),
    errMessage: `The maximum length is ${length} characters`,
    currentErrors
  })
}
