import * as Yup from 'yup'
import { telephoneRegex, emailRegex } from '@reapit/utils'
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
  REAPIT_REFERENCE_FIELD_WRONG_FORMAT: 'Should consit of 3 characters, 3 numbers',
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
    .max(20, errorMessages.MAXIMUM_CHARACTER_LENGTH(20)),
  [billingEmailField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(emailRegex, errorMessages.FIELD_WRONG_EMAIL_FORMAT),

  [billingKeyContactField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED),

  [statusField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED),

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
      .test('reapitReference', internalErrorMessages.REAPIT_REFERENCE_FIELD_WRONG_FORMAT, value =>
        checkReapitReferenceFormat(value),
      ),
    otherwise: Yup.string().notRequired(),
  }),

  [hasDirectDebitField.name]: Yup.string().when(hasReapitAccountsRefField.name, {
    is: 'no',
    then: Yup.string()
      .trim()
      .required(FIELD_REQUIRED)
      .oneOf(['yes'], hasDirectDebitField.errorMessage),
    otherwise: Yup.string().notRequired(),
  }),
})
