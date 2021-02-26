import * as Yup from 'yup'
import { passwordRegex } from '@reapit/utils'
import errorMessages from '@/constants/error-messages'
import { formFieldsChangePassword } from './form-fields'

const { FIELD_REQUIRED } = errorMessages

const { passwordField, confirmPasswordField, currentPasswordField } = formFieldsChangePassword

export const validationSchemaChangePassword = Yup.object().shape({
  [currentPasswordField.name]: Yup.string().trim().required(FIELD_REQUIRED),

  [passwordField.name]: Yup.string().trim().required(FIELD_REQUIRED).matches(passwordRegex, passwordField.errorMessage),

  [confirmPasswordField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .oneOf([Yup.ref(passwordField.name), ''], 'Passwords do not match.'),
})
