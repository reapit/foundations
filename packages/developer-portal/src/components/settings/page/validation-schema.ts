/* istanbul ignore file */
import { personNameRegex, letterNumberSpaceRegex, emailRegex } from '@reapit/utils-common'
import errorMessages from '../../../constants/error-messages'
import { object, string } from 'yup'

const { FIELD_REQUIRED, MAXIMUM_CHARACTER_LENGTH } = errorMessages

export const validationSchemaMember = object().shape({
  name: string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(personNameRegex, 'Full name is not valid')
    .max(256, MAXIMUM_CHARACTER_LENGTH(256)),

  email: string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(emailRegex, 'Email address is not valid')
    .max(256, MAXIMUM_CHARACTER_LENGTH(256)),

  jobTitle: string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(letterNumberSpaceRegex, 'Job title is not valid')
    .max(256, MAXIMUM_CHARACTER_LENGTH(256)),

  message: string().trim().required(FIELD_REQUIRED).max(256, MAXIMUM_CHARACTER_LENGTH(256)),
})
