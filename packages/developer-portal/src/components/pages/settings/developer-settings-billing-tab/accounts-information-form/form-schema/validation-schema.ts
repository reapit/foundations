import formFields from './form-fields'
const { reapitAccountsRefField } = formFields
import errorMessages from '@/constants/error-messages'
import * as Yup from 'yup'

const { FIELD_REQUIRED, MAXIMUM_CHARACTER_LENGTH, MINIMUM_CHARACTER_LENGTH } = errorMessages

const internalErrorMessages = {
  REAPIT_REFERENCE_FIELD_WRONG_FORMAT: 'Should consit of 3 characters, 3 numbers',
}

// 3 characers consecutive, 3 numbers consecutive
export const checkReapitReferenceFormat = (str: string) => {
  return /[a-zA-Z]{3}[0-9]{3}/.test(str)
}

export const validationSchema = Yup.object().shape({
  [reapitAccountsRefField.name]: Yup.string()
    .required(FIELD_REQUIRED)
    .min(6, MINIMUM_CHARACTER_LENGTH(6))
    .max(6, MAXIMUM_CHARACTER_LENGTH(6))
    .test('reapitReference', internalErrorMessages.REAPIT_REFERENCE_FIELD_WRONG_FORMAT, value =>
      checkReapitReferenceFormat(value),
    ),
})
