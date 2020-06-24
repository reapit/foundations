import * as Yup from 'yup'
import { formFields } from './form-fields'
import errorMessages from '@/constants/error-messages'
import { personNameRegex, telephoneRegex, emailRegex } from '@reapit/utils'

const { nameField, companyNameField, emailField, telephoneField } = formFields

export const validationSchema = Yup.object().shape({
  [nameField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(personNameRegex, nameField.errorMessage),

  [companyNameField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED),

  [emailField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(emailRegex, emailField.errorMessage),

  [telephoneField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(telephoneRegex, telephoneField.errorMessage),
})
