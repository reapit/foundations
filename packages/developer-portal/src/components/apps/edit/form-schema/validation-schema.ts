/* istanbul ignore file */
import { formFields } from './form-fields'
import errorMessages from '../../../../constants/error-messages'
import authFlows from '../../../../constants/app-auth-flow'
import {
  telephoneRegex,
  emailRegex,
  isValidUrlWithCustomScheme,
  isValidLimitToClientIds,
  whiteListLocalhostAndIsValidUrl,
  isValidHttpUrl,
  isValidHttpsUrl,
} from '@reapit/utils-common'
import { boolean, object, string } from 'yup'
import { specialCharsTest } from '../../../../utils/yup'

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
  isListed,
  termsAndConditionsUrl,
  privacyPolicyUrl,
  pricingUrl,
  isFree,
  products,
  videoUrl1,
  videoUrl2,
} = formFields

export const appEditValidationSchema = object().shape({
  [name.name]: string().trim().required(FIELD_REQUIRED).max(100, MAXIMUM_CHARACTER_LENGTH(100)).test(specialCharsTest),

  [isListed.name]: boolean(),

  [telephone.name]: string().when(isListed.name, {
    is: true,
    then: string()
      .trim()
      .required(FIELD_REQUIRED)
      .matches(telephoneRegex, telephone.errorMessage)
      .max(20, MAXIMUM_CHARACTER_LENGTH(20))
      .test(specialCharsTest),
    otherwise: string()
      .trim()
      .matches(telephoneRegex, { excludeEmptyString: true, message: telephone.errorMessage })
      .max(20, MAXIMUM_CHARACTER_LENGTH(20))
      .test(specialCharsTest),
  }),

  [supportEmail.name]: string()
    .trim()
    .when(isListed.name, {
      is: true,
      then: string().trim().required(FIELD_REQUIRED).matches(emailRegex, FIELD_WRONG_EMAIL_FORMAT),
      otherwise: string().trim().matches(emailRegex, { excludeEmptyString: true, message: FIELD_WRONG_EMAIL_FORMAT }),
    }),

  [launchUri.name]: string()
    .trim()
    .when(isListed.name, {
      is: true,
      then: string().trim().required(FIELD_REQUIRED),
      otherwise: string().notRequired(),
    })
    .test({
      name: 'isValidLaunchUri',
      message: launchUri.errorMessage,
      test: (value) => {
        if (!value) return true
        return whiteListLocalhostAndIsValidUrl(value)
      },
    }),

  [iconImageUrl.name]: string().when(isListed.name, {
    is: true,
    then: string().required(FIELD_REQUIRED),
    otherwise: string().notRequired(),
  }),

  [screen1ImageUrl.name]: string().when(isListed.name, {
    is: true,
    then: string().required(FIELD_REQUIRED),
    otherwise: string().notRequired(),
  }),

  [homePage.name]: string()
    .trim()
    .when(isListed.name, {
      is: true,
      then: string().trim().required(FIELD_REQUIRED),
      otherwise: string().notRequired(),
    })
    .test({
      name: 'isValidHomePage',
      message: homePage.errorMessage,
      test: (value) => {
        if (!value) return true
        return whiteListLocalhostAndIsValidUrl(value) || isValidHttpUrl(value)
      },
    }),

  [description.name]: string()
    .trim()
    .when(isListed.name, {
      is: true,
      then: string()
        .trim()
        .required(FIELD_REQUIRED)
        .min(150, errorMessages.BETWEEN_MIN_MAX_CHARACTER_LENGTH(150, 200000))
        .max(200000, errorMessages.BETWEEN_MIN_MAX_CHARACTER_LENGTH(150, 200000)),
      otherwise: string()
        .trim()
        .test({
          name: 'isValidDescription',
          message: errorMessages.BETWEEN_MIN_MAX_CHARACTER_LENGTH(150, 200000),
          test: (value) => {
            if (!value) return true
            return value.length >= 150 && value.length <= 200000
          },
        }),
    }),

  [summary.name]: string()
    .trim()
    .when(isListed.name, {
      is: true,
      then: string()
        .trim()
        .required(FIELD_REQUIRED)
        .min(50, errorMessages.BETWEEN_MIN_MAX_CHARACTER_LENGTH(50, 150))
        .max(150, errorMessages.BETWEEN_MIN_MAX_CHARACTER_LENGTH(50, 150))
        .test(specialCharsTest),
      otherwise: string()
        .trim()
        .test({
          name: 'isValidSummary',
          message: errorMessages.BETWEEN_MIN_MAX_CHARACTER_LENGTH(50, 150),
          test: (value) => {
            if (!value) return true
            return value.length >= 50 && value.length <= 150
          },
        })
        .test(specialCharsTest),
    }),

  [authFlow.name]: string().trim().required(FIELD_REQUIRED).oneOf([USER_SESSION, CLIENT_SECRET]),

  [scopes.name]: string().when(authFlow.name, (authFlow, schema) => {
    if (authFlow === CLIENT_SECRET) {
      return schema.required(scopes.errorMessage)
    }
    return schema
  }),

  [redirectUris.name]: string()
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

  [signoutUris.name]: string()
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

  [limitToClientIds.name]: string()
    .trim()
    .test({
      name: 'isValidLimitToClientIds',
      test: (value) => {
        if (value) {
          return isValidLimitToClientIds(value)
        }
        return true
      },
      message: limitToClientIds.errorMessage,
    })
    .test(specialCharsTest),

  [termsAndConditionsUrl.name]: string()
    .trim()
    .when(isListed.name, {
      is: true,
      then: string().trim().required(FIELD_REQUIRED),
      otherwise: string().notRequired(),
    })
    .test({
      name: 'isValidTermsAndConditionsUrl',
      message: termsAndConditionsUrl.errorMessage,
      test: (value) => {
        if (!value) return true
        return isValidHttpsUrl(value)
      },
    }),

  [privacyPolicyUrl.name]: string()
    .trim()
    .when(isListed.name, {
      is: true,
      then: string().trim().required(FIELD_REQUIRED),
      otherwise: string().notRequired(),
    })
    .test({
      name: 'isValidPrivacyPolicyUrl',
      message: privacyPolicyUrl.errorMessage,
      test: (value) => {
        if (!value) return true
        return isValidHttpsUrl(value)
      },
    }),

  [pricingUrl.name]: string()
    .trim()
    .when([isFree.name, isListed.name], {
      is: (isFree, isListed) => !isFree && isListed,
      then: (schema) => schema.required('Required if not free'),
    })

    .test({
      name: 'isValidPricingUrl',
      message: pricingUrl.errorMessage,
      test: (value) => {
        if (!value) return true
        return isValidHttpsUrl(value)
      },
    }),

  [videoUrl1.name]: string()
    .trim()
    .test({
      name: 'isValidVideo1',
      message: 'Video needs to be a valid https url',
      test: (value) => {
        if (!value) return true
        return isValidHttpsUrl(value)
      },
    }),

  [videoUrl2.name]: string()
    .trim()
    .test({
      name: 'isValidVideo2',
      message: 'Video needs to be a valid https url',
      test: (value) => {
        if (!value) return true
        return isValidHttpsUrl(value)
      },
    }),

  [products.name]: string().required('At least one product must be selected'),
})
