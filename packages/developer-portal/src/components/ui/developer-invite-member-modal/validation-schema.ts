import * as Yup from 'yup'
import { formFields } from './form-fields'
import errorMessages from '@/constants/error-messages'
import { personNameRegex, emailRegex } from '@reapit/utils'

export const MAX_MESSAGE_LENGTH = 150

const { inviteNameField, inviteEmailField, inviteMessageField } = formFields

export const validationSchema = Yup.object().shape({
  [inviteNameField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(personNameRegex, inviteNameField.errorMessage),

  [inviteEmailField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(emailRegex, inviteEmailField.errorMessage),

  [inviteMessageField.name]: Yup.string()
    .trim()
    .max(MAX_MESSAGE_LENGTH, errorMessages.MAXIMUM_CHARACTER_LENGTH(MAX_MESSAGE_LENGTH)),
})
