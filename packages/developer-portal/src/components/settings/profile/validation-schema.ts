/* istanbul ignore file */
import { personNameRegex, letterNumberSpaceRegex } from '@reapit/utils-common'
import errorMessages from '../../../constants/error-messages'
import githubUsernameRegex from 'github-username-regex'
import { object, string } from 'yup'

const { FIELD_REQUIRED, MAXIMUM_CHARACTER_LENGTH } = errorMessages

export const validationSchemaProfile = object().shape({
  name: string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(personNameRegex, 'Full name is not valid')
    .max(256, MAXIMUM_CHARACTER_LENGTH(256)),

  jobTitle: string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(letterNumberSpaceRegex, 'Job title is not valid')
    .max(256, MAXIMUM_CHARACTER_LENGTH(256)),

  gitHubUsername: string()
    .trim()
    .notRequired()
    .matches(githubUsernameRegex, 'GitHub username is not valid')
    .max(256, MAXIMUM_CHARACTER_LENGTH(256)),
})
