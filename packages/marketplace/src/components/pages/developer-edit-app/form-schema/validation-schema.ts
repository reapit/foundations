import * as Yup from 'yup'
import formFields from './form-fields'
import errorMessages from '@/constants/error-messages'
import authFlows from '@/constants/app-auth-flow'
import {
  letterNumberSpaceRegex,
  telephoneRegex,
  emailRegex,
  isValidUrlWithCustomScheme,
  isValidLimitToClientIds,
  whiteListLocalhostAndIsValidUrl,
  isValidHttpUrl,
} from '@reapit/utils'

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
  limitToClientIds,
} = formFields

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
    .required(FIELD_REQUIRED)
    .test({
      name: 'isValidLaunchUri',
      message: launchUri.errorMessage,
      test: whiteListLocalhostAndIsValidUrl,
    }),

  [iconImageUrl.name]: Yup.string().required(FIELD_REQUIRED),

  [screen1ImageUrl.name]: Yup.string().required(FIELD_REQUIRED),

  [homePage.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .test({
      name: 'isValidHomePage',
      message: homePage.errorMessage,
      test: value => whiteListLocalhostAndIsValidUrl(value) || isValidHttpUrl(value),
    }),

  [description.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .min(150, errorMessages.BETWEEN_MIN_MAX_CHARACTER_LENGTH(150, 1000))
    .max(1000, errorMessages.BETWEEN_MIN_MAX_CHARACTER_LENGTH(150, 1000)),

  [summary.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .min(50, errorMessages.BETWEEN_MIN_MAX_CHARACTER_LENGTH(50, 150))
    .max(150, errorMessages.BETWEEN_MIN_MAX_CHARACTER_LENGTH(50, 150)),

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

  [redirectUris.name]: Yup.string()
    .trim()
    .when(authFlow.name, (authFlow, schema) => {
      if (authFlow === USER_SESSION) {
        return schema.required(errorMessages.FIELD_REQUIRED).test({
          name: 'isValidUrlWithCustomSchemeRedirectUris',
          test: isValidUrlWithCustomScheme,
          message: redirectUris.errorMessage,
        })
      }
      return schema
    }),

  [signoutUris.name]: Yup.string()
    .trim()
    .when(authFlow.name, (authFlow, schema) => {
      if (authFlow === USER_SESSION) {
        return schema.required(errorMessages.FIELD_REQUIRED).test({
          name: 'isValidUrlWithCustomSchemeSignoutUris',
          test: isValidUrlWithCustomScheme,
          message: signoutUris.errorMessage,
        })
      }
      return schema
    }),

  [limitToClientIds.name]: Yup.string()
    .trim()
    .test({
      name: 'isValidLimitToClientIds',
      test: value => {
        if (value) {
          return isValidLimitToClientIds(value)
        }
        return true
      },
      message: limitToClientIds.errorMessage,
    }),
})

export default validationSchemaSubmitRevision
