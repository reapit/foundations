import * as Yup from 'yup'
import { emailRegex, telephoneRegex } from '@reapit/utils'
import errorMessages from '@/constants/error-messages'
import formFields from './form-fields'

const {
  reapitReferenceField,
  billingTelephoneField,
  billingEmailField,
  billingKeyContactField,
  statusField,
  hasReapitAccountsRefField,
  hasDirectDebitField,
} = formFields

const { FIELD_REQUIRED, MAXIMUM_CHARACTER_LENGTH, MINIMUM_CHARACTER_LENGTH } = errorMessages

const internalErrorMessages = {
  REAPIT_REFERENCE_FIELD_WRONG_FORMAT: 'Should consist of 3 characters, 3 numbers',
}

// 3 characers consecutive, 3 numbers consecutive
export const checkReapitReferenceFormat = (str: string) => {
  return /[a-zA-Z]{3}[0-9]{3}/.test(str)
}

export const validationSchema = Yup.object().shape({
  [billingTelephoneField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(telephoneRegex, billingTelephoneField.errorMessage)
    .max(30, errorMessages.MAXIMUM_CHARACTER_LENGTH(30)),

  [billingEmailField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(emailRegex, billingEmailField.errorMessage)
    .max(320, errorMessages.MAXIMUM_CHARACTER_LENGTH(320)),

  [billingKeyContactField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .max(150, errorMessages.MAXIMUM_CHARACTER_LENGTH(150)),

  [statusField.name]: Yup.string().trim().required(FIELD_REQUIRED),

  [hasReapitAccountsRefField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .oneOf(['no', 'yes'], hasReapitAccountsRefField.errorMessage),

  [reapitReferenceField.name]: Yup.string().when(hasReapitAccountsRefField.name, {
    is: 'yes',
    then: Yup.string()
      .trim()
      .required(FIELD_REQUIRED)
      .min(6, MINIMUM_CHARACTER_LENGTH(6))
      .max(6, MAXIMUM_CHARACTER_LENGTH(6))
      .test('reapitReference', internalErrorMessages.REAPIT_REFERENCE_FIELD_WRONG_FORMAT, (value) =>
        checkReapitReferenceFormat(value),
      ),
    otherwise: Yup.string().notRequired(),
  }),

  [hasDirectDebitField.name]: Yup.string(),
})
