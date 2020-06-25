import * as Yup from 'yup'
import formFields from './form-fields'
import errorMessages from '@/constants/error-messages'
import authFlows from '@/constants/app-auth-flow'
import { letterNumberSpaceRegex, telephoneRegex, emailRegex } from '@reapit/utils'

const { USER_SESSION, CLIENT_SECRET } = authFlows
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
  scopes,
  redirectUris,
  signoutUris,
} = formFields

const MIN_DESCRIPTION_LENGTH = 150
const MAX_DESCRIPTION_LENGTH = 1000
const MIN_SUMMARY_LENGTH = 50
const MAX_SUMMARY_LENGTH = 150

export const validationSchemaSubmitRevision = Yup.object().shape({
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

  [launchUri.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED),

  [iconImageUrl.name]: Yup.string().required(FIELD_REQUIRED),

  [homePage.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED),

  [description.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED),

  [summary.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED),

  [screen1ImageUrl.name]: Yup.string().required(FIELD_REQUIRED),

  [authFlow.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .oneOf([USER_SESSION, CLIENT_SECRET]),

  [scopes.name]: Yup.array().when(authFlow.name, (authFlow, schema) => {
    if (authFlow === CLIENT_SECRET) {
      return schema.required(scopes.errorMessage)
    }
    return schema
  }),
})

export default validationSchemaSubmitRevision
