import * as Yup from 'yup'
import { formFields } from './form-fields'
import errorMessages from '@/constants/error-messages'
import { isValidUrlWithCustomScheme } from '@/utils/validate'

const { FIELD_REQUIRED, FIELD_WRONG_URI_FORMAT } = errorMessages

const { signoutUrisField, redirectUrisField, nameField, scopesField } = formFields

export const validationSchema = Yup.object().shape({
  [signoutUrisField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .test({ name: 'isValidUrlWithCustomScheme', message: FIELD_WRONG_URI_FORMAT, test: isValidUrlWithCustomScheme }),
  [redirectUrisField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .test({ name: 'isValidUrlWithCustomScheme', message: FIELD_WRONG_URI_FORMAT, test: isValidUrlWithCustomScheme }),
  [nameField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED),
  [scopesField.name]: Yup.array().min(1, FIELD_REQUIRED),
})
