import * as Yup from 'yup'
import { personNameRegex, letterNumberSpaceRegex, passwordRegex } from '@reapit/utils'
import errorMessages from '@/constants/error-messages'
import { formFieldsContactInfomation, formFieldsChangePassword } from './form-fields'

const { nameField, jobTitleField } = formFieldsContactInfomation

const { FIELD_REQUIRED, MAXIMUM_CHARACTER_LENGTH } = errorMessages

export const validationSchemaContactInfomation = Yup.object().shape({
  [nameField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(personNameRegex, nameField.errorMessage)
    .max(256, MAXIMUM_CHARACTER_LENGTH(256)),

  [jobTitleField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(letterNumberSpaceRegex, jobTitleField.errorMessage)
    .max(256, MAXIMUM_CHARACTER_LENGTH(256)),
})

const { passwordField, confirmPasswordField, currentPasswordField } = formFieldsChangePassword

export const validationSchemaChangePassword = Yup.object().shape({
  [currentPasswordField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED),

  [passwordField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(passwordRegex, passwordField.errorMessage),

  [confirmPasswordField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .oneOf([Yup.ref(passwordField.name), ''], 'Passwords do not match.'),
})
