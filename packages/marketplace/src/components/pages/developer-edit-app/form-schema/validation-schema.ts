import * as Yup from 'yup'
import formFields from './form-fields'
import errorMessages from '@/constants/error-messages'
import authFlows from '@/constants/app-auth-flow'
import { letterNumberSpaceRegex, telephoneRegex, emailRegex } from '@reapit/utils'

const { FIELD_REQUIRED, MAXIMUM_CHARACTER_LENGTH, FIELD_WRONG_EMAIL_FORMAT } = errorMessages

const {
  name,
  telephone,
  supportEmail,
  launchUri,
  iconImageUrl,
  homePage,
  description,
  summary,
  screen1ImageUrl,
  authFlow,
} = formFields

const MIN_DESCRIPTION_LENGTH = 150
const MAX_DESCRIPTION_LENGTH = 1000
const MIN_SUMMARY_LENGTH = 50
const MAX_SUMMARY_LENGTH = 150

const submitAppValidationSchema = Yup.object().shape({
  [name.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(letterNumberSpaceRegex, name.errorMessage)
    .max(100, MAXIMUM_CHARACTER_LENGTH(100)),

  [telephone.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(telephoneRegex, telephone.errorMessage)
    .max(20, MAXIMUM_CHARACTER_LENGTH(20)),

  [supportEmail.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(emailRegex, FIELD_WRONG_EMAIL_FORMAT),

  [authFlow.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .oneOf(authFlows.USER_SESSION, authFlows.CLIENT_SECRET),
})

export default submitAppValidationSchema
