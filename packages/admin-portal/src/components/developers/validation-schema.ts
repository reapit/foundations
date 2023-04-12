/* istanbul ignore file */
import { personNameRegex, letterNumberSpaceRegex, emailRegex } from '@reapit/utils-common'
import { object, string } from 'yup'

export const validationSchemaMember = object().shape({
  name: string()
    .trim()
    .required()
    .matches(personNameRegex, 'Full name is not valid')
    .max(256, 'Maximum character length of 256'),
  email: string()
    .trim()
    .required()
    .matches(emailRegex, 'Email address is not valid')
    .max(256, 'Maximum character length of 256'),
  jobTitle: string()
    .trim()
    .required()
    .matches(letterNumberSpaceRegex, 'Job title is not valid')
    .max(256, 'Maximum character length of 256'),
  message: string().trim(),
})
