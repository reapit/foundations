import * as Yup from 'yup'
import { formFields } from './form-fields'
import errorMessages from '@/constants/error-messages'
import { personNameRegex, telephoneRegex, emailRegex } from '@reapit/utils'

const { nameField, companyNameField, emailField, telephoneField } = formFields

export const validationSchema = Yup.object().shape({
  [nameField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(personNameRegex, errorMessages.FIELD_INVALID_NAME),

  [companyNameField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED),

  [emailField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(emailRegex, errorMessages.FIELD_WRONG_EMAIL_FORMAT),

  [telephoneField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(telephoneRegex, errorMessages.FIELD_PHONE_NUMER),
})
