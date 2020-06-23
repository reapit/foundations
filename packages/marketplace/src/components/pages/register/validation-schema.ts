import * as Yup from 'yup'
import { formFields } from './form-fields'
import errorMessages from '@/constants/error-messages'
import { personNameRegex, telephoneRegex, emailRegex } from '@reapit/utils'

export const validationSchema = Yup.object().shape({
  [formFields.nameField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(personNameRegex, errorMessages.FIELD_INVALID_NAME),

  [formFields.companyNameField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED),

  [formFields.emailField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(emailRegex, errorMessages.FIELD_WRONG_EMAIL_FORMAT),

  [formFields.telephoneField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(telephoneRegex, errorMessages.FIELD_PHONE_NUMER),
})

