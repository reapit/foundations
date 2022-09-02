import { PartialRecord } from './index'

interface ValidateBaseProps<ValuesType, ErrorKeys extends string> {
  values: ValuesType
  keys: ErrorKeys[]
  validator(value: string): Boolean
  errMessage: string
  currentErrors: PartialRecord<ErrorKeys, string>
}

export interface ValidateCustomParams<ValuesType, ErrorKeys extends string> {
  values: ValuesType
  keys: ErrorKeys[]
  currentErrors: PartialRecord<ErrorKeys, string>
}

export const validateBase = <ValuesType, ErrorKeys extends string>({
  values,
  keys,
  validator,
  errMessage,
  currentErrors,
}: ValidateBaseProps<ValuesType, ErrorKeys>): PartialRecord<ErrorKeys, string> => {
  const errors: PartialRecord<ErrorKeys, string> = keys.reduce((errors, key) => {
    const keyAsString = key.toString()

    // validate using input error
    if (!validator(values[keyAsString])) {
      // skip if current validate field has error alread
      if (!currentErrors || !currentErrors[keyAsString]) {
        errors[keyAsString] = errMessage
      }
      return errors
    }
    return errors
  }, {})

  return { ...currentErrors, ...errors }
}
