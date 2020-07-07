import * as Yup from 'yup'
import { letterNumberSpaceRegex } from '@reapit/elements'
import { formFields } from './form-fields'
import { WizardStep } from './types'
import errorMessages from '@/constants/error-messages'
import { isValidUrlWithCustomScheme } from '@/utils/validate'
import { PartialRecord } from '@reapit/elements'

const { FIELD_REQUIRED, FIELD_WRONG_URI_FORMAT, MAXIMUM_CHARACTER_LENGTH } = errorMessages

const { signoutUrisField, redirectUrisField, nameField, scopesField } = formFields

export const validationSchemas: PartialRecord<WizardStep, Yup.ObjectSchema> = {
  INPUT_APP_NAME: Yup.object().shape({
    [nameField.name]: Yup.string()
      .trim()
      .required(errorMessages.FIELD_REQUIRED)
      .matches(letterNumberSpaceRegex, nameField.errorMessage)
      .max(100, MAXIMUM_CHARACTER_LENGTH(100)),
  }),
  INPUT_AUTHENTICATION_URIS: Yup.object().shape({
    [signoutUrisField.name]: Yup.string()
      .trim()
      .required(errorMessages.FIELD_REQUIRED)
      .test({ name: 'isValidUrlWithCustomScheme', message: FIELD_WRONG_URI_FORMAT, test: isValidUrlWithCustomScheme }),
    [redirectUrisField.name]: Yup.string()
      .trim()
      .required(errorMessages.FIELD_REQUIRED)
      .test({ name: 'isValidUrlWithCustomScheme', message: FIELD_WRONG_URI_FORMAT, test: isValidUrlWithCustomScheme }),
  }),

  GRANT_PERMISSION: Yup.object().shape({
    [scopesField.name]: Yup.array().min(1, FIELD_REQUIRED),
  }),
}
