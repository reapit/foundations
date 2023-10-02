/* istanbul ignore file */
import * as Yup from 'yup'
import { formFields } from './form-fields'
import errorMessages from '../../constants/error-messages'
import { personNameRegex, telephoneRegex, emailRegex } from '@reapit/utils-common'
import { specialCharsTest } from '../../utils/yup'
import githubUsernameRegex from 'github-username-regex'

const { nameField, companyNameField, emailField, telephoneField, gitHubUsernameField } = formFields

export const validationSchema = Yup.object().shape({
  [nameField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(personNameRegex, nameField.errorMessage)
    .test(specialCharsTest),

  [companyNameField.name]: Yup.string().trim().required(errorMessages.FIELD_REQUIRED).test(specialCharsTest),

  [emailField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(emailRegex, emailField.errorMessage),

  [telephoneField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(telephoneRegex, telephoneField.errorMessage)
    .test(specialCharsTest),

  [gitHubUsernameField.name]: Yup.string()
    .trim()
    .test({
      name: 'isValidDescription',
      message: 'GitHub Username is not valid',
      test: (value) => {
        if (!value) return true
        return githubUsernameRegex.test(value)
      },
    })
    .test(specialCharsTest),
})
